import { shallowMount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import MyForm from '../src/components/MyForm.vue'
import ConfirmButton from '../src/components/ConfirmButton.vue'

describe('MyForm', () => {
  let wrapper

  const findForm = () => wrapper.find('[data-testid="form"]')
  const findError = () => wrapper.find('[data-testid="error"]')
  const findSuccess = () => wrapper.find('[data-testid="success-message"]')
  const findUsernameInput = () => wrapper.find('[data-testid="username"]')
  const findPasswordInput = () => wrapper.find('[data-testid="password"]')
  const findConfirmButton = () => wrapper.findComponent(ConfirmButton)

  const mountComponent = () => {
    wrapper = shallowMount(MyForm)
  }

  it('renders the form by default', () => {
    mountComponent()

    expect(findForm().exists()).toBe(true)
  })

  it('renders `Submit` text on submit button', () => {
    mountComponent()

    expect(findConfirmButton().props('buttonText')).toBe('Submit')
  })

  it('disables the submit button when username field is empty', async () => {
    mountComponent()
    findUsernameInput().setValue('some-username')

    expect(findConfirmButton().props('disabled')).toBe(true)
  })

  it('disables the submit button when password field is empty', () => {
    mountComponent()
    findPasswordInput().setValue('some-username')

    expect(findConfirmButton().props('disabled')).toBe(true)
  })

  describe('when username and password fields are filled', () => {
    beforeEach(() => {
      mountComponent()
      findUsernameInput().setValue('some-username')
      findPasswordInput().setValue('some-username')
    })

    it('enables the Submit button', async () => {
      expect(findConfirmButton().props('disabled')).toBe(false)
    })

    describe('on form submit', () => {
      beforeEach(() => {
        findConfirmButton().vm.$emit('confirm')
      })

      it.todo('calls the API')

      describe('when loading', () => {
        it.todo('renders a `Loading...` text on the button')

        it.todo('does not render an error')
      })

      describe('on success', () => {
        it.todo('renders `Submit` text on the button')

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
