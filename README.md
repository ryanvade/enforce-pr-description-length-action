# Enforce Pull Request Description Length Action

This action checks that a Pull Request Description is at a minimum length.  By default the minimum length is one.  If a different minimum length is needed it can be passed in using an Action Input. 

## Inputs

### `minLength`

A specific minimum length the description must be. 

## Example Usage

```
- name: Enforce Pull Request Description Length
  uses: ryanvade/enforce-pr-description-length-action@v1.1.2
```

## Example Usage with a specific min length

```
- name: Enforce Pull Request Description Length
  uses: ryanvade/enforce-pr-description-length-action@v1.1.2
  with:
    minLength: 5
```
