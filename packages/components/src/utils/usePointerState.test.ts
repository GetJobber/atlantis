import { renderHook } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import userEvent from "@testing-library/user-event";
import { usePointerState } from "./usePointerState";

describe("usePointerState", () => {
  let user: UserEvent;

  beforeEach(() => {
    user = userEvent.setup();
  });

  describe("isPointerDown", () => {
    it("returns false when pointer is not pressed", () => {
      const { result } = renderHook(() => usePointerState());

      expect(result.current.isPointerDown()).toBe(false);
    });

    describe("when a mouse left pointer is used", () => {
      it("returns true when pressed down and false when released", async () => {
        const { result } = renderHook(() => usePointerState());

        await holdDown(user, "MouseLeft");
        expect(result.current.isPointerDown()).toBe(true);
        await release(user, "MouseLeft");
        expect(result.current.isPointerDown()).toBe(false);
      });
    });

    describe("when a mouse right pointer is used", () => {
      it("returns false when pressed down", async () => {
        const { result } = renderHook(() => usePointerState());

        await holdDown(user, "MouseRight");
        expect(result.current.isPointerDown()).toBe(false);
        await release(user, "MouseRight");
        expect(result.current.isPointerDown()).toBe(false);
      });
    });

    describe("when a touch pointer is used", () => {
      it("returns true when pressed down and false when released", async () => {
        const { result } = renderHook(() => usePointerState());

        await holdDown(user, "TouchA");
        expect(result.current.isPointerDown()).toBe(true);
        await release(user, "TouchA");
        expect(result.current.isPointerDown()).toBe(false);
      });
    });
  });

  describe("onPointerUp", () => {
    it("calls the registered callback when pointer is released", async () => {
      const callback = jest.fn();
      const { result } = renderHook(() => usePointerState());

      await holdDown(user, "MouseLeft");

      result.current.onPointerUp(callback);

      await release(user, "MouseLeft");

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith(expect.any(MouseEvent));
    });

    it("calls multiple registered callbacks", async () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();
      const { result } = renderHook(() => usePointerState());

      await holdDown(user, "MouseLeft");
      result.current.onPointerUp(callback1);
      result.current.onPointerUp(callback2);
      await release(user, "MouseLeft");

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });

    it("clears callbacks after they are called", async () => {
      const callback = jest.fn();
      const { result } = renderHook(() => usePointerState());

      await holdDown(user, "MouseLeft");
      result.current.onPointerUp(callback);
      await release(user, "MouseLeft");
      expect(callback).toHaveBeenCalledTimes(1);
      callback.mockClear();

      await holdDown(user, "MouseLeft");
      await release(user, "MouseLeft");
      expect(callback).toHaveBeenCalledTimes(0);
    });

    it("does not call callback if pointer is not released", async () => {
      const callback = jest.fn();
      const { result } = renderHook(() => usePointerState());

      await holdDown(user, "MouseLeft");
      result.current.onPointerUp(callback);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("multiple hook instances", () => {
    it("works with multiple instances", async () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      const { result: result1 } = renderHook(() => usePointerState());
      const { result: result2 } = renderHook(() => usePointerState());

      await holdDown(user, "MouseLeft");
      result1.current.onPointerUp(callback1);
      result2.current.onPointerUp(callback2);
      await release(user, "MouseLeft");

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });

    it("shares pointer state across instances", async () => {
      const { result: result1 } = renderHook(() => usePointerState());
      const { result: result2 } = renderHook(() => usePointerState());

      await holdDown(user, "MouseLeft");
      expect(result1.current.isPointerDown()).toBe(true);
      expect(result2.current.isPointerDown()).toBe(true);

      await release(user, "MouseLeft");
      expect(result1.current.isPointerDown()).toBe(false);
      expect(result2.current.isPointerDown()).toBe(false);
    });
  });

  describe("cleanup", () => {
    it("does not call callback after unmount", async () => {
      const callback = jest.fn();
      const { result, unmount } = renderHook(() => usePointerState());

      await holdDown(user, "MouseLeft");
      result.current.onPointerUp(callback);
      unmount();
      await release(user, "MouseLeft");

      expect(callback).not.toHaveBeenCalled();
    });

    it("removes subscribers on unmount", async () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      const { result: result1, unmount: unmount1 } = renderHook(() =>
        usePointerState(),
      );
      const { result: result2 } = renderHook(() => usePointerState());

      await holdDown(user, "MouseLeft");
      result1.current.onPointerUp(callback1);
      result2.current.onPointerUp(callback2);

      unmount1();

      await release(user, "MouseLeft");

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

  describe("event order", () => {
    it("handles rapid pointer down and up events", async () => {
      const callback = jest.fn();
      const { result } = renderHook(() => usePointerState());

      await holdDown(user, "MouseLeft");
      result.current.onPointerUp(callback);
      await release(user, "MouseLeft");
      await holdDown(user, "MouseLeft");
      await release(user, "MouseLeft");

      // Callback only gets called once before being cleared
      expect(callback).toHaveBeenCalledTimes(1);
      expect(result.current.isPointerDown()).toBe(false);
    });

    it("track state correctly through multiple pointer cycles", async () => {
      const { result } = renderHook(() => usePointerState());
      expect(result.current.isPointerDown()).toBe(false);

      await holdDown(user, "MouseLeft");
      expect(result.current.isPointerDown()).toBe(true);

      await release(user, "MouseLeft");
      expect(result.current.isPointerDown()).toBe(false);

      await holdDown(user, "MouseLeft");
      expect(result.current.isPointerDown()).toBe(true);

      await release(user, "MouseLeft");
      expect(result.current.isPointerDown()).toBe(false);
    });
  });
});

async function holdDown(user: UserEvent, key: string) {
  await user.pointer({
    keys: `[${key}>]`,
    target: document.body,
  });
}

async function release(user: UserEvent, key: string) {
  await user.pointer({
    keys: `[/${key}]`,
    target: document.body,
  });
}
