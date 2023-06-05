//
//  RCTPickerManager.swift
//  Jobber
//
//  Created by Darryl Tec on 2022-07-21.
//  Copyright © 2022 Octopusapp Inc. All rights reserved.
//

import Foundation

@objc(RCTATLPicker)
class RCTATLPickerManager: RCTViewManager {

    override static func requiresMainQueueSetup() -> Bool {
        return true
    }

    override func view() -> UIView! {
        if #available(iOS 14.0, *) {
            return ATLPickerView();
        } else {
            return ATLFallBackPickerView()
        }
    }
}
