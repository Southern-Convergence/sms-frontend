export default defineNuxtPlugin(()=>{
  //This has not been removed for purposes of remembering how pamphlets are used.
  let pamphlet_definitions:PamphletDefinitions = {
    "pds" : [
      {
          name : "Personal Information",
          icon : "mdi-account-box-outline",
          subsection : [
            {title : "Basic Information", template : "basic-info"},
            {title : "Government IDs", template : "gov-ids"},
            {title : "Nationality and Residence Information", template : "natl-info"},
            {title : "Contact Information", template : "contact-info"},
            {title : "Additional Information", template : "additional-info"}
          ],
          active : 0,
        },
        {
          name : "Health Information",
          icon : "mdi-heart-pulse",
          subsection : [
            { title : "History", template : "history" },
            { title : "Medications", template : "medications"}
          ],
          active : 0
        },
        {
          name : "Family Background",
          icon : "mdi-family-tree",
          subsection : [
            {title : "Spouse", template : "spouse"},
            {title : "Parent/s", template : "parents"},
            {title : "Children", template : "children"}
          ],
          active : 0
        },
        {
          name : "Educational Background",
          icon : "mdi-school-outline",
          subsection : [
            {title : "", template : "education"}
          ],
          active : 0
        },
        {
          name : "Civil Service Eligibility",
          icon : "mdi-form-select",
          subsection : [
            {title : "", template : "cs-eligibility"}
          ],
          active : 0
        },
        {
          name : "Work Experience",
          icon : "mdi-briefcase-outline",
          subsection : [
            {title : "", template : "work-exp"}
          ],
          active : 0
        },
        {
          name : "Voluntary Work",
          icon : "mdi-briefcase-outline",
          subsection : [
            {title : "Voluntary Work or Involvement in Civic/Non-Government/People/Voluntary Organizations", template : "voluntary-exp"}
          ],
          active : 0
        },
        {
          name : "L&D Interventions",
          icon : "mdi-human-male-board",
          subsection : [
            {title : "Learning & Development Interventions/Training Programs Attended", template : "lnd"}
          ],
          active : 0
        },
        {
          name : "Other Information",
          icon : "mdi-dots-horizontal",
          subsection : [
            {title : "", template : "other"}
          ],
          active : 0
        }
    ],

    "work-info" : [
      {
        name : "Employment Profile",
        subsection : [
          {title : "Service Information", template : "service-info"}
        ],
        icon : "mdi-card-account-details",
        active : 0
      }
    ]
  }

  return {
    provide : {pamphlet_definitions, debug : true}
  }
});