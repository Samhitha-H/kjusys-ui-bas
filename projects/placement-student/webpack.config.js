const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const mf = require("@angular-architects/module-federation/webpack");
const path = require("path");
const share = mf.share;

const sharedMappings = new mf.SharedMappings();
sharedMappings.register(
  path.join(__dirname, '../../tsconfig.json'),[
    /* mapped paths to share */
    "@libs/left-menu-lib",
    "@libs/menu-header-lib",
    "@libs/shared-auth",
    "@libs/http-common",
  ]);

module.exports = {
  output: {
    uniqueName: "placement-student",
    publicPath: 'http://localhost:4202/',
    scriptType: 'text/javascript',
  },
  optimization: {
    runtimeChunk: false
  },   
  resolve: {
    alias: {
      ...sharedMappings.getAliases(),
    }
  },
  experiments: {
    outputModule: true
  },
  plugins: [
    new ModuleFederationPlugin({
        library: { type: "module" },
        name: "placement-student",
        filename: "remoteEntry.js",
        exposes: {
             // Example expose, user can add more modules here
             './Module': './projects/placement-student/src/app/app.module.ts',
          './DashboardModule': './projects/placement-student/src/app/modules/dashboard/dashboard.module.ts',
          './DrivesModule': './projects/placement-student/src/app/modules/drives/drives.module.ts',


        },
        shared: share({
          "@angular/core": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/common/http": { singleton: true, strictVersion: true, requiredVersion: 'auto' }, 
          "@angular/router": { singleton: true, strictVersion: true, requiredVersion: 'auto' },
          "ngx-toastr": { singleton: true, strictVersion: true, requiredVersion: 'auto' },

          ...sharedMappings.getDescriptors()
        })
        
    }),
    sharedMappings.getPlugin()
  ],
};
