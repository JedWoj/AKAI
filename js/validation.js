const INITIAL_FORM_VALUES = {
  fields: {
    firstName: "",
    secondName: "",
    email: "",
  },
  sections: {
    frontend: false,
    backend: false,
    mobile: false,
    grafika: false,
  },
};

class RegistrationForm {
  constructor() {
    this.fields = INITIAL_FORM_VALUES.fields;
    this.sections = INITIAL_FORM_VALUES.sections;
    this.mountingComponent();
  }

  mountingComponent() {
    this.addFieldsHandlers();
    this.addSectionChecboxesHandlers();
    this.addSubmitBtnHandler();
  }

  addFieldsHandlers() {
    const fields = document.querySelectorAll(".registration__input");
    fields.forEach((field) => {
      return field.addEventListener("input", (e) => {
        this.fields = { ...this.fields, [field.dataset.name]: e.target.value };
      });
    });
  }

  addSectionChecboxesHandlers() {
    const options = document.querySelectorAll(".registration__checkbox-wrap");
    options.forEach((option) =>
      option.querySelector("input").addEventListener("change", () => {
        const toggledSection = option
          .querySelector("label")
          .textContent.toLowerCase();
        this.sections = {
          ...this.sections,
          [toggledSection]: !this.sections[toggledSection],
        };
      })
    );
  }

  addSubmitBtnHandler() {
    document.querySelector("form").addEventListener("submit", (e) => {
      e.preventDefault();
      this.submitForm();
    });
  }

  validateFields() {
    const isValidEmail = this.fields.email.match(/^\S+@\S+\.\S+$/);
    const isValidFirstName = this.fields.firstName
      .trim()
      .match(/^([a-zA-Z]){2,30}$/);
    const isValidSecondName = this.fields.secondName
      .trim()
      .match(/^([a-zA-Z]){2,30}$/);

    return !!isValidEmail && !!isValidFirstName && !!isValidSecondName;
  }

  validateSections() {
    return Object.values(this.sections).some((it) => it);
  }

  resetForm() {
    const fields = document.querySelectorAll(".registration__input");
    fields.forEach((field) => (field.value = ""));
    const section = document.querySelectorAll(".registration__checkbox");
    section.forEach((section) => (section.checked = false));
    this.fields = INITIAL_FORM_VALUES.fields;
    this.sections = INITIAL_FORM_VALUES.sections;
  }

  handleBackgroundGradient(className) {
    const backgroundClasses = document.querySelector(".registration").classList;
    backgroundClasses.add(className);
    setTimeout(() => {
      backgroundClasses.remove(className);
    }, 2000);
  }

  handleInvalidForm() {
    document.querySelector("h2").classList.remove("hidden");
    this.handleBackgroundGradient("registration--error");
  }

  handleValidForm() {
    document.querySelector("h2").classList.add("hidden");
    this.handleBackgroundGradient("registration--success");
    this.resetForm();
  }

  submitForm() {
    this.validateFields() && this.validateSections()
      ? this.handleValidForm()
      : this.handleInvalidForm();
  }
}

new RegistrationForm();
