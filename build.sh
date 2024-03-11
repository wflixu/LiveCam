unset APPLE_SIGNING_IDENTITY
unset APPLE_CERTIFICATE
sign_app="3rd Party Mac Developer Application: <Team ID>"
sign_install="3rd Party Mac Developer Installer: <Team ID>"
profile="config/entitlements/Mac_App_Distribution_icamera.provisionprofile"

target="universal-apple-darwin"

npx tauri build --target "${target}" --verbose
# cargo tauri build --target "${target}" --verbose

app_path="src-tauri/target/${target}/release/bundle/macos/LiveCam.app"
build_name="src-tauri/target/${target}/release/bundle/macos/LiveCam.pkg"
cp_dir="src-tauri/target/${target}/release/bundle/macos/LiveCam.app/Contents/embedded.provisionprofile"
entitlements="config/entitlements/LiveCam.entitlements"

cp "${profile}" "${cp_dir}"

codesign --deep --force -s "${sign_app}" --entitlements ${entitlements} "${app_path}"

productbuild  --component "${app_path}" /Applications/  --sign "${sign_install}"   "${build_name}"