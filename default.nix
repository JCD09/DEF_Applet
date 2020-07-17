with (import <nixpkgs> {});
let
  /* unstable = import <unstable> {}; */
  /* nodejs_12 = callPackage ./packages/node_12_x.nix {}; */
in
stdenv.mkDerivation {
    name = "Environment";
    nativeBuildInputs = with nodePackages; [
    npm
    # nodejs-12_x
    nodejs-10_x
    parcel-bundler
    vscode
    git
  ];
}
