export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string,
    route: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        title: '$21k',
        subtitle: 'Ejemplo 1',
        route: '/component/alert'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: '$1k',
        subtitle: 'Ejemplo 2',
        route: '/component/badges'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: '456',
        subtitle: 'Ejemplo 3',
        route: '/component/buttons'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: '210',
        subtitle: 'Ejemplo 4',
        route: '/component/table'
    },

] 