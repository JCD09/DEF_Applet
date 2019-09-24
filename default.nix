with (import <nixpkgs> {});
let
  unstable = import <unstable> {};
  nodejs_12 = callPackage ./packages/node_12_x.nix {};
in
stdenv.mkDerivation {
    name = "Environment";
    nativeBuildInputs = with unstable.nodePackages; [ npm nodejs-11_x parcel-bundler];
}
