import { shallowMount, mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import MyForm from '../src/components/MyForm.vue'
import * as api from '../src/fakeApi'

const mockSendFormData = vi.spyOn(api, 'sendFormData')

describe('MyForm', () => {
  let wrapper

  const mountComponent = () => {
    wrapper = shallowMount(MyForm)
  }

  afterEach(() => {
    wrapper.unmount()
  })

  it.todo('renders the form by default')

  it.todo('renders `Submit` text on submit button')

  it.todo('disables the submit button when username field is empty')

  it.todo('disables the submit button when password field is empty')

  describe('when username and password fields are filled', () => {
    it.todo('enables the Submit button')

    describe('on form submit', () => {
      it.todo('calls the API')

      describe('when loading', () => {
        it.todo('renders a `Loading...` text on the button')

        it.todo('does not render an error')
      })

      describe('on success', () => {
        it.todo('renders welcome text')

        it.todo('does not render form')

        it.todo('does not render error message')
      })

      describe('on error', () => {
        it.todo('renders `Submit` text on the button')

        it.todo('does not render welcome text')

        it.todo('renders a form')

        it.todo('renders an error message')
      })
    })
  })
})
