import { User } from '@/types';
import { apiSlice } from '../services/apiSlice';



interface SocialAuthArgs {
	provider: string;
	state: string;
	code: string;
}

interface CreateUserResponse {
	success: boolean;
	user: User;
}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		retrieveUser: builder.query<User, void>({
			query: () => '/accounts/user-profile/',
		}),

		verify: builder.mutation({
			query: () => ({
				url: '/accounts/verify/',
				method: 'POST',
			}),
		}),

		logout: builder.mutation({
			query: () => ({
				url: '/accounts/logout/',
				method: 'POST',
			}),
		}),

		requestLoginOtp: builder.mutation({
			query: ({ email_or_mobile, send_otp_on_mobile }) => ({
				url: '/accounts/loginreg-request-otp/',
				method: 'POST',
				body: { email_or_mobile,  send_otp_on_mobile },
			}),
		}),

		confirmLoginOtp: builder.mutation({
			query: ({ otp }) => ({
				url: '/accounts/loginreg-confirm-otp/',
				method: 'POST',
				body: { otp },
			}),
		}),

		contactUs: builder.mutation({
			query: ({ name, email, mobile, message}) => ({
				url: '/common/contact/',
				method: 'POST',
				body: {name, email, mobile, message},
			}),
		}),

		register: builder.mutation({
			query: ({
				first_name,
				last_name,
				email,
				password,
				re_password,
			}) => ({
				url: '/users/',
				method: 'POST',
				body: { first_name, last_name, email, password, re_password },
			}),
		}),

		socialAuthenticate: builder.mutation<
			CreateUserResponse,
			SocialAuthArgs
		>({
			query: ({ provider, state, code }) => ({
				url: `/o/${provider}/?state=${encodeURIComponent(
					state
				)}&code=${encodeURIComponent(code)}`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			}),
		}),
		
		activation: builder.mutation({
			query: ({ uid, token }) => ({
				url: '/users/activation/',
				method: 'POST',
				body: { uid, token },
			}),
		}),

		resetPassword: builder.mutation({
			query: email => ({
				url: '/users/reset_password/',
				method: 'POST',
				body: { email },
			}),
		}),

		resetPasswordConfirm: builder.mutation({
			query: ({ uid, token, new_password, re_new_password }) => ({
				url: '/users/reset_password_confirm/',
				method: 'POST',
				body: { uid, token, new_password, re_new_password },
			}),
		}),
	}),
});

export const {
	useSocialAuthenticateMutation,
	useRetrieveUserQuery,
	useRequestLoginOtpMutation,
	useConfirmLoginOtpMutation,
	useVerifyMutation,
	useLogoutMutation,
	useContactUsMutation,
	
	useRegisterMutation,
	useActivationMutation,
	useResetPasswordMutation,
	useResetPasswordConfirmMutation,
} = authApiSlice;
