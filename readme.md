# Fresh Fit Fuel

## Run Dev Environment Locally

``` bash
cd api
dotnet restore
dotnet user-secrets set "fff-storage-conn-string" "<get-this-value-from-azure-storage-account>"
func start

# from another terminal window
cd ux
npm install
npm start
```
