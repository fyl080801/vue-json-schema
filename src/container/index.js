import vjsContainerMixin from './mixins'

const VueFormJsonSchema = {
  name: 'json-schema-container',
  mixins: [vjsContainerMixin],
  render() {
    return this.$createElement(this.tag, this.vjsFields)
  }
}

export default VueFormJsonSchema
