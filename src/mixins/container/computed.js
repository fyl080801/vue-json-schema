const computed = {
  vjsSchemaValid() {
    return this.vjsSchema.every(this.isVjsFieldSchemaValid)
  },
  vjsModelValid() {
    return this.vjsSchema.every(this.isVjsFieldModelValid)
  }
}

export default computed
