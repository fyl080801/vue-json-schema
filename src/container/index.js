import vjsContainerMixin from '../mixins/container'

const VueFormJsonSchema = {
  name: 'json-schema-container',
  mixins: [vjsContainerMixin],
  render() {
    return this.$createElement(this.tag, this.vjsFields)
  }
}

export default VueFormJsonSchema
