//
//  PickerOption.swift
//  Jobber
//
//  Created by Darryl Tec on 2022-07-21.
//  Copyright © 2022 Octopusapp Inc. All rights reserved.
//

import Foundation
import UIKit;

@available(iOS 13.0, *)
class ATLPickerOption {
    var identifier: UIAction.Identifier?;
    var title: String;
    var isActive: Bool;
    var state: UIAction.State = .off

    init(details: NSDictionary){
        if let identifier = details["value"] as? NSString {
            self.identifier = UIAction.Identifier(rawValue: identifier as String);
        }

        if let title = details["label"] as? NSString {
            self.title = title as String;
        } else {
            self.title = "";
        }

        if let isActive = details["isActive"] as? Bool {
            self.isActive = isActive as Bool;
            if isActive == true {
                self.state = .on
            }
        } else {
            self.isActive = false;
            self.state = .off
        }
    }

    func createUIAction(_ handler: @escaping UIActionHandler) -> UIAction {
        return UIAction(title: title, identifier: identifier, state: state, handler: handler)
    }
}
