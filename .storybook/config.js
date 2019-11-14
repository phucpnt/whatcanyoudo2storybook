import { configure, addDecorator } from '@storybook/react';
import { withR2Request } from "storybook-addon-r2request/lib/index";

addDecorator(withR2Request);

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
