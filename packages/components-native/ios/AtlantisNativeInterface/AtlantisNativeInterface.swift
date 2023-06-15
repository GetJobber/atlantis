//
//  AtlantisNativeInterface.swift
//  ComponentsNative
//
//  Created by Michael Paradis on 2023-06-12.
//  Copyright © 2023 Facebook. All rights reserved.
//

import Foundation


@objc(AtlantisNativeInterface)
class AtlantisNativeInterface: RCTEventEmitter {

    @objc(openActionSheet:resolver:rejecter:)
    func openActionSheet(_ data: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        print("open Action Sheet stub");
        resolve("Open Action Sheet Stub");
    }

}

