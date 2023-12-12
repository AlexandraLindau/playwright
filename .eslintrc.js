module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb-base",
        "airbnb-typescript/base"
    ],
    "parser": "@typescript-eslint/parser",
    "plugins": ["@typescript-eslint"],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "project": true,
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        "import/prefer-default-export": 0,
        "max-len": ['warn', { 'code': 130 }],
        "no-await-in-loop": 0,
        "no-plusplus": 0
    }
}
