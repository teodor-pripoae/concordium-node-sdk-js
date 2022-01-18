use crate::aux_functions::*;
use wasm_bindgen::prelude::*;

#[wasm_bindgen(js_name = generateUnsignedCredential)]
pub fn generate_unsigned_credential_ext(input: &str) -> String {
    match generate_unsigned_credential_aux(input) {
        Ok(s) => s,
        Err(e) => format!("Unable to generate an unsigned credential due to: {}", e),
    }
}

#[wasm_bindgen(js_name = getDeploymentDetails)]
pub fn get_credential_deployment_details_ext(
    signatures: &JsValue,
    unsigned_info: &str,
    expiry: u64,
) -> String {
    let signatures_vec: Vec<String> = signatures.into_serde().unwrap();
    match get_credential_deployment_details_aux(signatures_vec, unsigned_info, expiry) {
        Ok(s) => s,
        Err(e) => format!("Unable to get credential deployment details due to: {}", e),
    }
}

#[wasm_bindgen(js_name = getDeploymentInfo)]
pub fn get_credential_deployment_info_ext(
    signatures: &JsValue,
    unsigned_info: &str,
) -> String {
    let signatures_vec: Vec<String> = signatures.into_serde().unwrap();
    match get_credential_deployment_info_aux(signatures_vec, unsigned_info) {
        Ok(s) => s,
        Err(e) => format!("unable to get credential due to: {}", e),
    }
}

#[wasm_bindgen(js_name = createEncryptedTransferData)]
pub fn create_encrypted_transfer_ext(
    input: &str
) -> String {
    match create_encrypted_transfer_aux(input) {
        Ok(s) => s,
        Err(e) => format!("unable to create encrypted transfer due to: {}", e),
    }
}


#[wasm_bindgen(js_name = createTransferToPublicData)]
pub fn create_transfer_to_public_ext(
    input: &str
) -> String {
    match create_transfer_to_public_aux(input) {
        Ok(s) => s,
        Err(e) => format!("unable to create encrypted transfer due to: {}", e),
    }
}
