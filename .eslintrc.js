module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    // Allow unused vars when prefixed with _
    '@typescript-eslint/no-unused-vars': ['warn', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      destructuredArrayIgnorePattern: '^_'
    }],
    // Allow var in global declarations (needed for Prisma client)
    'no-var': ['error', { 
      allowGlobalVariables: true 
    }],
    // Disable explicit any warning temporarily while types are being added
    '@typescript-eslint/no-explicit-any': 'warn',
    // Disable missing dependencies warning for useEffect
    'react-hooks/exhaustive-deps': 'warn',
    // Allow img elements (can be removed once all images are migrated to next/image)
    '@next/next/no-img-element': 'warn'
  },
  ignorePatterns: [
    'node_modules/',
    '.next/',
    'public/'
  ]
}