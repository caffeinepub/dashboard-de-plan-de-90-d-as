import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Order "mo:core/Order";

actor {
  type Task = {
    id : Nat;
    description : Text;
    dueTime : Time.Time;
    completed : Bool;
    phase : Nat;
    milestone : Nat;
    notes : Text;
    content : TaskContent;
  };

  module Task {
    public func compare(t1 : Task, t2 : Task) : Order.Order {
      Nat.compare(t1.id, t2.id);
    };
  };

  type TaskContent = {
    phase : Nat;
    milestone : Nat;
    details : {
      #businessModel : {
        questions : [Text];
        answers : [Text];
      };
      #domainStrategy : {
        criteria : [Text];
        domains : [Text];
      };
      #branding : {
        requirements : [Text];
        assets : [Text];
      };
      #legalStructure : {
        items : [Text];
        progress : [Text];
      };
      #siteArchitecture : {
        pages : [Text];
        navigation : [Text];
      };
      #seoTasks : {
        tasks : [Text];
        status : [Text];
      };
      #crmStages : {
        stages : [Text];
        contacts : [Text];
      };
      #automationWorkflows : {
        workflows : [Text];
        status : [Text];
      };
      #chatbotFlows : {
        flows : [Text];
        messages : [Text];
      };
      #socialMediaPlans : {
        platforms : [Text];
        posts : [Text];
      };
      #adCampaignDetails : {
        channels : [Text];
        ads : [Text];
      };
      #optimizationMetrics : {
        metrics : [Text];
        values : [Text];
      };
    };
  };

  type AdsMetrics = {
    month : Text;
    spent : Float;
    leads : Nat;
    appointments : Nat;
    converted : Nat;
  };

  type Milestone = {
    id : Nat;
    name : Text;
    description : Text;
    progress : Nat;
  };

  var nextTaskId = 0;
  let tasks = Map.empty<Nat, Task>();
  let adsMetrics = Map.empty<Text, AdsMetrics>();
  let milestones = Map.empty<Nat, Milestone>();

  public shared ({ caller }) func addTask(
    description : Text,
    dueTime : Time.Time,
    phase : Nat,
    milestone : Nat,
    notes : Text,
    content : TaskContent,
  ) : async Nat {
    assert (phase >= 1 and phase <= 6);
    assert (milestone >= 1 and milestone <= 18);

    let task : Task = {
      id = nextTaskId;
      description;
      dueTime;
      completed = false;
      phase;
      milestone;
      notes;
      content;
    };
    tasks.add(nextTaskId, task);
    nextTaskId += 1;
    task.id;
  };

  public shared ({ caller }) func addTaskNotes(taskId : Nat, notes : Text) : async () {
    switch (tasks.get(taskId)) {
      case (?task) {
        let updatedTask : Task = { task with notes };
        tasks.add(taskId, updatedTask);
      };
      case (null) { Runtime.trap("Task not found") };
    };
  };

  public shared ({ caller }) func completeTask(taskId : Nat, completedVal : Bool) : async () {
    switch (tasks.get(taskId)) {
      case (?task) {
        let updatedTask : Task = { task with completed = completedVal };
        tasks.add(taskId, updatedTask);
      };
      case (null) { Runtime.trap("Task not found") };
    };
  };

  public shared ({ caller }) func editTask(
    taskId : Nat,
    newDescription : Text,
    newDueTime : Time.Time,
    newPhase : Nat,
    newMilestone : Nat,
    newContent : TaskContent,
  ) : async () {
    switch (tasks.get(taskId)) {
      case (?task) {
        let updatedTask : Task = {
          task with
          description = newDescription;
          dueTime = newDueTime;
          phase = newPhase;
          milestone = newMilestone;
          content = newContent;
        };
        tasks.add(taskId, updatedTask);
      };
      case (null) { Runtime.trap("Task not found") };
    };
  };

  public query ({ caller }) func getAllTasks() : async [Task] {
    let taskArray = tasks.values().toArray();
    taskArray.sort();
  };

  public query ({ caller }) func getTasksByPhase(phase : Nat) : async [Task] {
    let filteredTasks = tasks.values().filter(
      func(task) { task.phase == phase }
    );
    filteredTasks.toArray().sort();
  };

  public query ({ caller }) func getTasksByMilestone(milestone : Nat) : async [Task] {
    let filteredTasks = tasks.values().filter(
      func(task) { task.milestone == milestone }
    );
    filteredTasks.toArray().sort();
  };

  public query ({ caller }) func getActiveTasks() : async [Task] {
    let incompleteTasks = tasks.values().filter(
      func(task) { not task.completed }
    );
    incompleteTasks.toArray().sort();
  };

  public query ({ caller }) func getCompletedTasks() : async [Task] {
    let completedTasks = tasks.values().filter(
      func(task) { task.completed }
    );
    completedTasks.toArray().sort();
  };

  public shared ({ caller }) func clearIncompleteTasks() : async () {
    let incompleteTasks = tasks.filter(
      func(_id, task) { task.completed == false }
    );

    incompleteTasks.forEach(func(id, _task) { tasks.remove(id) });
  };

  public shared ({ caller }) func clearCompletedTasks() : async () {
    let completedTasks = tasks.filter(
      func(_id, task) { task.completed == true }
    );

    completedTasks.forEach(func(id, _task) { tasks.remove(id) });
  };

  public shared ({ caller }) func addAdsMetrics(
    month : Text,
    spent : Float,
    leads : Nat,
    appointments : Nat,
    converted : Nat,
  ) : async () {
    let metrics : AdsMetrics = {
      month;
      spent;
      leads;
      appointments;
      converted;
    };
    adsMetrics.add(month, metrics);
  };

  public query ({ caller }) func getAdsMetricsByMonth(month : Text) : async ?AdsMetrics {
    adsMetrics.get(month);
  };

  public query ({ caller }) func getAllAdsMetrics() : async [AdsMetrics] {
    adsMetrics.values().toArray();
  };

  public shared ({ caller }) func addMilestone(
    id : Nat,
    name : Text,
    description : Text,
  ) : async () {
    let milestone : Milestone = {
      id;
      name;
      description;
      progress = 0;
    };
    milestones.add(id, milestone);
  };

  public shared ({ caller }) func updateMilestoneProgress(
    milestoneId : Nat,
    progress : Nat,
  ) : async Bool {
    if (progress > 100) {
      Runtime.trap("Progress cannot exceed 100");
    };

    switch (milestones.get(milestoneId)) {
      case (?milestone) {
        let updatedMilestone : Milestone = {
          milestone with
          progress
        };
        milestones.add(milestoneId, updatedMilestone);
        true;
      };
      case (null) { false };
    };
  };

  public query ({ caller }) func getMilestone(milestoneId : Nat) : async ?Milestone {
    milestones.get(milestoneId);
  };

  public query ({ caller }) func getAllMilestones() : async [Milestone] {
    milestones.values().toArray();
  };
};
