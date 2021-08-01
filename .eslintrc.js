module.exports = {
    root: true,
    extends: ['./node_modules/@lcgroup.tools/linters/eslint'],
    overrides: [
        {
            files: ["*.ts"],
            parserOptions: {
                project: "./tsconfig.json",
                tsconfigRootDir: __dirname,
            },
        },
        {
            files: ['*.component.html'],
            rules: {
                'max-len': 'off',
            },
        },
    ],
};
