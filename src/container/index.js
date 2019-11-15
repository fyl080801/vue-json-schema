import vjsContainerMixin from './mixins'

const VueJsonSchema = {
  name: 'json-schema-container',
  mixins: [vjsContainerMixin],
  render() {
    return this.$createElement(this.tag, this.vjsFields)
  }
}

export default VueJsonSchema
