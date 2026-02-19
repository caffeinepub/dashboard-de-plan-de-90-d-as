import Map "mo:core/Map";

module {
  type Task = {
    id : Nat;
    description : Text;
    dueTime : Int;
    completed : Bool;
    phase : Nat;
    milestone : Nat;
    notes : Text;
    content : TaskContent;
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

  type OldActor = {
    tasks : Map.Map<Nat, Task>;
    adsMetrics : Map.Map<Text, AdsMetrics>;
    nextTaskId : Nat;
  };

  type Milestone = {
    id : Nat;
    name : Text;
    description : Text;
    progress : Nat;
  };

  type NewActor = {
    tasks : Map.Map<Nat, Task>;
    adsMetrics : Map.Map<Text, AdsMetrics>;
    milestones : Map.Map<Nat, Milestone>;
    nextTaskId : Nat;
  };

  public func run(old : OldActor) : NewActor {
    let milestones = Map.empty<Nat, Milestone>();
    { old with milestones };
  };
};
