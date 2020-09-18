## Debug
Reproduce production environment (as if you were running it on the physical phone itself)
- `expo start --no-dev --minify`

If you're havving problems after upgrading the Expo SDK...
- run `expo r -c` to clear the expo cache as well as `npm cache clean -f` to clear the npm cache.

## Invariant Violation: Tried to register two views with the same name RNCSafeAreaProvider
- [Try this](https://github.com/th3rdwave/react-native-safe-area-context/issues/110#issuecomment-668864576)
