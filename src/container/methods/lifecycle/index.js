const vjsLifecycle = {
  vjsDestroy() {
    this.vjsEvents.forEach(event => this.removeVjsListener(event))
  },
  vjsInitialize() {
    this.setVjsSchema(this.schema)

    this.vjsOptions = {
      ...this.vjsOptions,
      ...this.options
    }

    this.vjsComponents = this.components

    this.vjsBusInitialize()

    this.addVjsListeners(this.vjsEvents, this.vjsBusEventHandler)

    this.setVjsModel(this.model, true)

    this.vjsValidationInitialize()

    this.setVjsUiSchema(this.uiSchema)

    this.setVjsUiFieldsActive()
  }
}

export default vjsLifecycle
