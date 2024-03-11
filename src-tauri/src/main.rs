// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Manager, SystemTray, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem};

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
   
    let tray_menu = SystemTrayMenu::new()
        .add_item(quit);
    let tray = SystemTray::new().with_menu(tray_menu);

    tauri::Builder::default()
        .system_tray(tray)
        .on_system_tray_event(|app, event| match event {
          SystemTrayEvent::LeftClick {
            position: _,
            size: _,
            ..
          } => {
            println!("system tray received a left click");
          }
          SystemTrayEvent::RightClick {
            position: _,
            size: _,
            ..
          } => {
            println!("system tray received a right click");
          }
          SystemTrayEvent::DoubleClick {
            position: _,
            size: _,
            ..
          } => {
            println!("system tray received a double click");
          }
          SystemTrayEvent::MenuItemClick { id, .. } => {
            match id.as_str() {
              "quit" => {
                std::process::exit(0);
              }
              // "hide" => {
              //   let window = app.get_window("main").unwrap();
              //   window.hide().unwrap();
              // }
        
              _ => {}
            }
          }
          _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
