// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    // Your custom configs here
)
    .override('nuxt/vue/rules', {
        rules: {
            'vue/attributes-order': 'off',
            'vue/max-attributes-per-line': 'off',
            'vue/singleline-html-element-content-newline': 'off',
            'vue/html-self-closing': 'off',

            'vue/html-indent': ['error', 4],
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
