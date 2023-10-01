export const PERSONAL_INFO = [
  {
    name: "First Name",
    key: "firstName",
  },
  {
    name: "Last Name",
    key: "lastName",
  },
  {
    name: "Email",
    key: "emailId",
  },
  {
    name: "Phone",
    info: "without dial code",
    key: "phoneNumber",
  },
  {
    name: "Nationality",
    key: "nationality",
  },
  {
    name: "Current Residence",
    key: "currentResidence",
  },
  {
    name: "ID Number",
    key: "idNumber",
  },
  {
    name: "Date of Birth",
    key: "dateOfBirth",
  },
  {
    name: "Gender",
    key: "gender",
  },
];

export const PROFILE = [
  {
    name: "Education",
    key: "education",
  },
  {
    name: "Experience",
    key: "experience",
  },
  {
    name: "Resume",
    key: "resume",
  },
];

export const QUESTION_TYPES = [
  { value: "Paragraph", label: "Paragraph" },
  { value: "Short answer", label: "Short answer" },
  { value: "Yes/No", label: "Yes/No" },
  { value: "Dropdown", label: "Dropdown" },
  { value: "Multiple choice", label: "Multiple choice" },
  { value: "Date", label: "Date" },
  { value: "Number", label: "Number" },
  { value: "File upload", label: "File upload" },
  { value: "Video question", label: "Video question" },
];

export const initialState = {
  data: {
    id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    type: "applicationForm",
    attributes: {
      coverImage: "",
      personalInformation: {
        firstName: {
          internalUse: false,
          show: true,
        },
        lastName: {
          internalUse: false,
          show: true,
        },
        emailId: {
          internalUse: false,
          show: true,
        },
        phoneNumber: {
          internalUse: false,
          show: true,
        },
        nationality: {
          internalUse: false,
          show: true,
        },
        currentResidence: {
          internalUse: false,
          show: true,
        },
        idNumber: {
          internalUse: false,
          show: true,
        },
        dateOfBirth: {
          internalUse: false,
          show: true,
        },
        gender: {
          internalUse: false,
          show: true,
        },
        personalQuestions: [
          {
            id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
            type: "Paragraph",
            question: "",
            choices: [""],
            maxChoice: 0,
            disqualify: false,
            other: false,
          },
        ],
      },
      profile: {
        education: {
          mandatory: true,
          show: true,
        },
        experience: {
          mandatory: true,
          show: true,
        },
        resume: {
          mandatory: true,
          show: true,
        },
        profileQuestions: [
          {
            id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
            type: "Paragraph",
            question: "",
            choices: [""],
            maxChoice: 0,
            disqualify: false,
            other: false,
          },
        ],
      },
      customisedQuestions: [
        {
          id: "497f6eca-6276-4993-bfeb-53cbbbba6f08",
          type: "Paragraph",
          question: "",
          choices: [""],
          maxChoice: 0,
          disqualify: false,
          other: false,
        },
      ],
    },
  },
};
