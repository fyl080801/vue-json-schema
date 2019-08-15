import vjsFieldMixin from '../mixins/field'

const VueFormJsonSchemaFieldComponent = {
  name: 'json-schema-field',
  mixins: [vjsFieldMixin],
  render() {
    return this.$createElement(
      this.vjsComponent,
      {
        ...this.getVjsAttributes()
      },
      this.$slots.default
    )
  }
}

export default VueFormJsonSchemaFieldComponent
