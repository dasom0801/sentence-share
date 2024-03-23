import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Header from '../Header';

const meta = {
  title: 'common/Header',
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedOut: Story = {
  decorators: [
    (Story) => {
      const client = new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
          },
        },
      });

      return (
        <QueryClientProvider client={client}>
          <BrowserRouter>
            <Story />
          </BrowserRouter>
        </QueryClientProvider>
      );
    },
  ],
};

// export const LoggedIn: Story = {
//   parameters: {
//     localStorage: {
//       access_token: 'logged in',
//     },
//   },
//   decorators: [
//     (Story) => {
//       const client = new QueryClient({
//         defaultOptions: {
//           queries: {
//             retry: false,
//           },
//         },
//       });

//       return (
//         <QueryClientProvider client={client}>
//           <BrowserRouter>
//             <Story />
//           </BrowserRouter>
//         </QueryClientProvider>
//       );
//     },
//   ],
// };
