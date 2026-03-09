import '@testing-library/jest-dom/vitest'

// jsdom does not implement HTMLDialogElement#showModal/close; polyfill for Modal tests
if (typeof HTMLDialogElement !== 'undefined') {
  const proto = HTMLDialogElement.prototype
  if (typeof proto.showModal !== 'function') {
    proto.showModal = function () {
      this.setAttribute('open', '')
    }
  }
  if (typeof proto.close !== 'function') {
    proto.close = function () {
      this.removeAttribute('open')
    }
  }
}

// jsdom does not implement URL.createObjectURL/revokeObjectURL; polyfill for ImageUpload tests
if (typeof URL.createObjectURL !== 'function') {
  URL.createObjectURL = () => 'blob:mock-url'
  URL.revokeObjectURL = () => {}
}
