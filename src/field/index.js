import vjsFieldMixin from './mixins'

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
