import type Cast from '@app/types/Cast';

// We would normally get a list of movies from some API.
// For now we just hardcode some movie objects and leave
// it up to a util function to generate a random number of
// movies from these values.
const Casts: Array<Cast> = [
    {
        name: 'Ines White',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/RussellBishop/128.jpg',
        gender: 'male',
        role: 'Actor',
    },
    {
        name: 'Mr. Carlos Schneider',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/isnifer/128.jpg',
        gender: 'female',
        role: 'acctress',
    },
    {
        name: 'Ms. Leatha Lemke',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/jomarmen/128.jpg',
        gender: 'female',
        role: 'acctress',
    },
    {
        name: 'Melyssa McClure',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/mvdheuvel/128.jpg',
        gender: 'male',
        role: 'police officer',
    },
    {
        name: 'Cameron Oberbrunner',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/BroumiYoussef/128.jpg',
        gender: 'male',
        role: 'villain',
    },
    {
        name: 'Karley Batz',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/victordeanda/128.jpg',
        gender: 'female',
        role: 'Teacher',
    },
    {
        name: 'Stanford Schmidt',
        picture: 'https://s3.amazonaws.com/uifaces/faces/twitter/divya/128.jpg',
        gender: 'male',
        role: 'horse rider',
    },
    {
        id: '8',
        name: 'Linnea Kohler',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/nckjrvs/128.jpg',
        gender: 'male',
        role: 'uber driver',
    },
    {
        name: 'Mr. Guillermo Veum',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/vicivadeline/128.jpg',
        gender: 'male',
        role: 'Gangster',
    },
    {
        name: 'Delphia Kris',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/mufaddal_mw/128.jpg',
        gender: 'female',
        role: 'Comedian',
    },
    {
        name: 'Miss Marc Langosh',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/a1chapone/128.jpg',
        gender: 'female',
        role: 'whistleblower',
    },
    {
        name: 'Maeve Bashirian',
        picture:
            'https://s3.amazonaws.com/uifaces/faces/twitter/santi_urso/128.jpg',
        gender: 'male',
        role: 'computer programmer',
    },
];

export default Casts;
