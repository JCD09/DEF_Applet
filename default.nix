with (import <nixpkgs> {});
stdenv.mkDerivation {
    name = "Environment";
    nativeBuildInputs = with nodePackages; [ npm ];
}
