export interface Feed {
    class: string,
    icon: string,
    task: string,
    time: string
}

export const Feeds: Feed[] = [

    {
        class: 'bg-info',
        icon: 'bi bi-bell',
        task: 'Mensaje 1.',
        time: 'Texto de tiempo'
    },
    {
        class: 'bg-success',
        icon: 'bi bi-hdd',
        task: 'Mensaje 2.',
        time: '2 Hours ago'
    },
    {
        class: 'bg-warning',
        icon: 'bi bi-bag-check',
        task: 'Mensaje 3.',
        time: '31 May'
    },
    {
        class: 'bg-danger',
        icon: 'bi bi-person',
        task: 'Mensaje 4.',
        time: '30 May'
    },
    {
        class: 'bg-primary',
        icon: 'bi bi-person',
        task: 'Mensaje 5.',
        time: '21 May'
    },
    {
        class: 'bg-info',
        icon: 'bi bi-person',
        task: 'Mensaje 6.',
        time: 'Just Now'
    },
    {
        class: 'bg-primary',
        icon: 'bi bi-bell',
        task: 'Mensaje 7.',
        time: 'Just Now'
    },
] 