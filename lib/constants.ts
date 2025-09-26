export const DAYS_OF_WEEK_IN_ORDER = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
] as const


export const PrivateNavLinks = [
    {
        imgURL: '/events.svg',
        route: '/events',
        label: 'My Events',
    },
    {
        imgURL: '/schedule.svg',
        route: '/schedule',
        label: 'My Schedule',
    },
    {
        imgURL: '/public.svg',
        route: '/book',
        label: 'Public Profile',
    },
] as const