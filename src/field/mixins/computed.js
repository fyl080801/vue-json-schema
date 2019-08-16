import { merge } from 'lodash'

const attrsValueElements = ['input', 'option', 'textarea']

const domPropsValueElements = ['input', 'textarea']

const domPropsCheckedElements = ['checkbox', 'radio']

const innerHTMLElements = ['textarea']

const requiredElements = ['input', 'select', 'textarea']

const computed = {
  vjsComputedFieldHasErrors() {
    return (
      this.vjsFieldState.vjsFieldErrors &&
      this.vjsFieldState.vjsFieldErrors.length > 0
    )
  },
  vjsComputedShowFieldErrors() {
    return (
      (this.vjsFieldState.vjsFieldDirty && this.vjsFieldState.vjsFieldBlur) ||
      this.vjsOptions.showValidationErrors
    )
  },
  vjsComputedFieldErrorOptions() {
    return this.vjsComputedShowFieldErrors && this.vjsComputedFieldHasErrors
      ? this.vjsFieldErrorOptions
      : {}
  },
  vjsComputedFieldAttrs() {
    const attrs = {
      // id: this.vjsFieldId, // debug
    }

    if (requiredElements.indexOf(this.vjsComponent) !== -1) {
      attrs.required = this.vjsFieldRequired
    }

    if (attrsValueElements.indexOf(this.vjsComponent) !== -1) {
      attrs.value =
        this.vjsFieldModel ||
        (this.vjsFieldOptions.attrs && this.vjsFieldOptions.attrs.value)
    }

    return attrs
  },
  vjsComputedFieldDomProps() {
    const domProps = {}

    if (innerHTMLElements.indexOf(this.vjsComponent) !== -1) {
      domProps.innerHTML =
        this.vjsFieldModel ||
        (this.vjsFieldOptions.domProps &&
          this.vjsFieldOptions.domProps.innerHTML)
    }

    if (domPropsValueElements.indexOf(this.vjsComponent) !== -1) {
      domProps.value =
        this.vjsFieldModel ||
        (this.vjsFieldOptions.domProps && this.vjsFieldOptions.domProps.value)
    }

    if (domPropsCheckedElements.indexOf(this.vjsComponent) !== -1) {
      domProps.checked =
        this.vjsFieldModel ||
        (this.vjsFieldOptions.domProps && this.vjsFieldOptions.domProps.checked)
    }

    return domProps
  },
  vjsComputedFieldOptions() {
    return {
      attrs: this.vjsComputedFieldAttrs,
      domProps: this.vjsComputedFieldDomProps,
      key: this.vjsFieldOptions.key || this.vjsFieldId
    }
  },
  vjsComputedMergedFieldOptions() {
    return merge(
      {},
      this.vjsDefaultOptions,
      this.vjsComputedFieldErrorOptions,
      this.vjsComputedFieldOptions
    )
  }
}

export default computed
