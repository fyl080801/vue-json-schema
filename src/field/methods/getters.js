import { merge } from 'lodash-es'

const getters = {
  getVjsAttributes() {
    return this.getVjsFieldAttributes(
      this.vjsFieldOptions,
      this.vjsComputedMergedFieldOptions
    )
  },
  getVjsFieldAttributes(
    {
      class: optionsClass,
      on: optionsOn,
      nativeOn: optionsNativeOn,
      ...options
    } = {},
    {
      class: defaultOptionsClass,
      on: defaultOn,
      nativeOn: defaultNativeOn,
      ...defaultOptions
    } = {}
  ) {
    if (!options) {
      return {}
    }

    const classFormatted = merge(
      {},
      this.vjsFieldHelperFormatClasses(optionsClass),
      this.vjsFieldHelperFormatClasses(defaultOptionsClass)
    )

    const onFormatted = merge(
      this.vjsFieldHelperFormatEvents(optionsOn),
      this.vjsFieldHelperFormatEvents(defaultOn)
    )

    const nativeOnFormatted = merge(
      this.vjsFieldHelperFormatEvents(optionsNativeOn),
      this.vjsFieldHelperFormatEvents(defaultNativeOn)
    )

    const computedOptions = {
      class: classFormatted,
      on: onFormatted,
      nativeOn: nativeOnFormatted
    }

    const defaultProps = Object.assign(
      {},
      {
        props: this.$options.propsData
      }
    )

    const fieldOptionsAsProps = { props: options }

    const valueProp = {
      props: {
        [this.vjsFieldValueProp]: this.vjsFieldModel
      }
    }

    const allAttributes = merge(
      {},
      defaultProps,
      defaultOptions,
      fieldOptionsAsProps,
      options,
      computedOptions,
      valueProp
    )

    return allAttributes
  }
}

export default getters
