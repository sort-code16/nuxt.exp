// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    // Your custom configs here
)
    .override('nuxt/vue/rules', {
        rules: {
            'vue/attributes-order': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            'vue/html-self-closing': 'off',

            'vue/html-indent': ['error', 4],
            'vue/attribute-hyphenation': ['warn', 'never'],

            'vue/max-attributes-per-line': ['warn', {
                singleline: { max: 6 },
            }],
        },
    })
    .override('nuxt/stylistic', {
        rules: {
            '@stylistic/semi': 'off',
            '@stylistic/brace-style': 'off',
            '@stylistic/member-delimiter-style': 'off',
            '@stylistic/arrow-parens': 'off',
            '@stylistic/no-extra-parens': 'off',

            '@stylistic/indent': ['error', 4],
            '@stylistic/quotes': ['error', 'single'],
            '@stylistic/quote-props': ['error', 'as-needed'],
            '@stylistic/max-statements-per-line': ['error', { max: 2 }],

            '@stylistic/max-len': ['error', {
                code: 120,
                ignoreUrls: true,
                ignoreStrings: true,
            }],
        },
    })
    // .append({
    //     rules: {},
    // })
