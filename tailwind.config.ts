import { Config } from 'tailwindcss';

import { shadcnPreset } from './resources/ts/lib/shadcn-preset';

const config = {
  presets: [shadcnPreset],
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/ts/**/*.tsx',
  ],
} satisfies Config;

export default config;
