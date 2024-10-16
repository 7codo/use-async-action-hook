
`useAsyncAction` is a custom React hook that simplifies handling asynchronous actions with built-in error handling and toast notifications. It provides a clean and reusable way to manage async operations in your React components.

- Type-safe async action handling
- Integrated error state management
- Automatic toast notifications for success and error cases
- Customizable success and error messages
- Returns the result of the async action for further processing

To use `useAsyncAction` in your project, you need to have React and the Shadcnui toast `@/components/ui/use-toast` component from your UI library installed. Then copy the `use-async-action.ts` file into your project's `hooks` directory (or create one if it doesn't exist).


## Usage

Here's a basic example of how to use the `useAsyncAction` hook:

```tsx
import { useState } from 'react'
import { useAsyncAction } from './hooks/use-async-action'

interface User {
  id: number
  name: string
}

function UserComponent() {
  const [user, setUser] = useState<User | null>(null)
  const [fetchUser, error] = useAsyncAction<User>({
    successMessage: "User fetched successfully!",
    errorMessage: "Failed to fetch user",
  })

  const handleFetchUser = async () => {
    const result = await fetchUser(async () => {
      const response = await fetch('https://api.example.com/user/1')
      if (!response.ok) {
        throw new Error('Failed to fetch user')
      }
      return response.json()
    })

    if (result) {
      setUser(result)
    }
  }

  return (
    <div>
      <button onClick={handleFetchUser}>Fetch User</button>
      {error && <p>Error: {error.message}</p>}
      {user && <p>User: {user.name}</p>}
    </div>
  )
}
```

## API

### `useAsyncAction<T>(options?: UseAsyncActionOptions)`

#### Parameters

- `options` (optional): An object with the following properties:
  - `successMessage` (optional): A string to display in the success toast. Default: "Operation completed successfully!"
  - `errorMessage` (optional): A string to display as the title of the error toast. Default: "An error occurred"

#### Returns

An array containing:

1. `executeAction`: A function that takes an async function as an argument and returns a promise that resolves to the result of the async function or `undefined` if an error occurred.
2. `error`: The current error state (`Error | null`).

## TypeScript

This hook is written in TypeScript and provides full type safety. When using the hook, you can specify the expected return type of your async action:

```tsx
const [fetchData, error] = useAsyncAction<YourDataType>()
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
```

I hope this README provides a comprehensive guide for users of the `useAsyncAction` hook. It includes installation instructions, usage examples, API documentation, and information about TypeScript support. Feel free to adjust any part of it to better fit your project's needs or style.