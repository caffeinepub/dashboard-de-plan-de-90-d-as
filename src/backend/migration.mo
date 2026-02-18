import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";

module {
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

  type OldTask = {
    id : Nat;
    description : Text;
    dueTime : Time.Time;
    completed : Bool;
    phase : Nat;
    milestone : Nat;
    notes : Text;
    status : TaskStatus;
    content : TaskContent;
  };

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

  type TaskStatus = { #enProgreso; #terminado; #pausado };

  // Old actor
  type OldActor = {
    nextTaskId : Nat;
    tasks : Map.Map<Nat, OldTask>;
    adsMetrics : Map.Map<Text, AdsMetrics>;
  };

  // New actor
  type NewActor = {
    nextTaskId : Nat;
    tasks : Map.Map<Nat, Task>;
    adsMetrics : Map.Map<Text, AdsMetrics>;
  };

  public func run(old : OldActor) : NewActor {
    let newTasks = old.tasks.map<Nat, OldTask, Task>(
      func(_taskId, oldTask) {
        {
          oldTask with
          status = #enProgreso // Set status to default value (will be removed)
        };
      }
    );
    { old with tasks = newTasks };
  };
};
