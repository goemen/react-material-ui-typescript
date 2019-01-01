import { Page } from "../pages/Page";

export function Authorize(roles: string[] = []) {
    return function (target: any, property: string, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        descriptor.value = function () {
            const context: Page<any, any> = this as any;
            const user = context.getUser();

            if (!roles) {
                roles = [];
            }

            if (user) {
                if (!roles.length || user.hasRoles(roles)) {
                    return original.apply(this, arguments);
                }

            }

            const message = roles.length ? 'You do not permission to perform this action. Please contact administrators to sort this out.'
                : 'You need to be logged in to perform this action.';

            const buttons = [
                { label: 'Dismiss', handler: () => context.dismissAlert() }
            ]

            if (!roles.length) {
                buttons.push({
                    label: 'Login', handler: () => {
                        context.dismissAlert();
                        context.goto('/account/login');
                    }
                });
            }
            return context.alert('Access denied', message, buttons);
        };
    }
}