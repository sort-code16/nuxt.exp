export default {
    extends: ['stylelint-config-standard-scss'],

    overrides: [
        {
            files: ['**/*.vue'],
            customSyntax: 'postcss-html',
        },
    ],

    rules: {
        /* 'selector-pseudo-element-no-unknown': [
            true,
            {
                ignorePseudoElements: ['v-deep', 'deep', 'slotted', 'global'],
            },
        ], */

        'alpha-value-notation': 'number',
        'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }],

        'custom-property-empty-line-before': [
            'always',
            {
                ignore: [
                    'after-comment',
                    'after-custom-property',
                    'first-nested',
                    'inside-single-line-block',
                ],
            },
        ],

        'scss/double-slash-comment-empty-line-before': [
            'never',
            {
                ignore: ['between-comments'],
            },
        ],
    },
};
