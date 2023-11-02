import { flushPromises, shallowMount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import MyForm from '../src/components/MyForm.vue'
import ConfirmButton from '../src/components/ConfirmButton.vue'
import * as api from '../src/fakeApi'

const mockSendFormData = vi.spyOn(api, 'sendFormData')

describe('MyForm', () => {
  let wrapper

  const findForm = () => wrapper.find('[data-testid="form"]')
  const findError = () => wrapper.find('[data-testid="error"]')
  const findWelcomeMessage = () =>
    wrapper.find('[data-testid="welcome-message"]')
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
      it('calls the API on button click', () => {
        findConfirmButton().vm.$emit('confirm')

        expect(mockSendFormData).toHaveBeenCalledOnce()
      })

      describe('when loading', () => {
        beforeEach(() => {
          findConfirmButton().vm.$emit('confirm')
        })

        it('renders a `Loading...` text on the button', () => {
          expect(findConfirmButton().props('buttonText')).toBe('Loading...')
        })

        it('does not render an error', () => {
          expect(findError().exists()).toBe(false)
        })
      })

      describe('on success', () => {
        beforeEach(() => {
          mockSendFormData.mockResolvedValueOnce()
          findConfirmButton().vm.$emit('confirm')
        })

        it('renders welcome text', () => {
          expect(findWelcomeMessage().exists()).toBe(true)
          expect(findWelcomeMessage().text()).toBe('Welcome, some-username!')
        })

        it('does not render form', () => {
          expect(findForm().exists()).toBe(false)
        })

        it('does not render error message', () => {
          expect(findError().exists()).toBe(false)
        })
      })

      describe('on error', () => {
        beforeEach(() => {
          mockSendFormData.mockRejectedValue('Error')
          findConfirmButton().vm.$emit('confirm')
        })

        it('renders `Submit` text on the button', async () => {
          console.log(wrapper.html())
        })

        it.todo('does not render welcome text')

        it.todo('renders a form')

        it.todo('renders an error message')
      })
    })
  })
})
