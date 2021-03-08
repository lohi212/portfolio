export const CATEGORIES = [
  {
    text: "Recents",
    key: 'RECENTS',
    subCategories: []
  },
  {
    text: "Prospects Management",
    subCategories: [
      { 
        label: "Add Prospects Record", 
        value: "add_prospect_record", 
        route: 'add-prospects-record',
        isdisabled: true
      },
      {
        label: "Prospects Record ListView", 
        route: 'prospects-record-listview',
        value: "prospects_record_listview",
        isdisabled: true
      },
      { 
        label: "Enrichment Queue", 
        value: "enrichment_queue", 
        route: 'enrichment-queue', 
      }
    ]
  },
  {
    text: "Account Management",
        subCategories: [
      { 
        label: "Unified Account Profile", 
        value: "unified_account_profile", 
        route: 'unified-account-profile' 
      },
    ]
  },
  {
    text: "Configuration Management",
    subCategories: [
      { 
        label: "ICP Score Configuration", 
        value: "icp_score_configuration",
        route: "icp-score-configuration",
        isdisabled: true
      },
      {
        label: "Engagement Score Configuration",
        value: "engagement_score_configuration",
        route: "engagement-score-configuration",
        isdisabled: true
      },
      { 
        label: "Intent Score Configuration", 
        value: "intent_score_configuration",
        route: "intent-score-configuration",
        isdisabled: true 
      },
      { 
        label: "Relationship Score Configuration", 
        value: "relationship_score_configuration",
        value: "relationship-score-configuration",
        isdisabled: true 
      }
    ]
  },
  {
    text: "Setup",
    subCategories: [
      { 
        label: "User Maintainance", 
        value: "user_maintainance",
        route: "user-maintainance",
        isdisabled: true 
      },
      {
        label: "Role Maintainance",
        value: "role_maintainance",
        route: "role-maintainance",
        isdisabled: true
      },
      { 
        label: "Data Import Export", 
        value: "data_import_export",
        route: "data-import-export",
        isdisabled: true 
      }
    ]
  }
];
