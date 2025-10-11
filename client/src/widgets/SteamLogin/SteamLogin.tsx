"use client";
import Button from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography";

import { SteamLoginInput } from "../SteamLoginInput/SteamLoginInput";
import { Input } from "@/shared/ui/Input";

import Link from "next/link";
import { SteamValidateAccountRes } from "@/shared/api";
import { Checkbox } from "@/shared/ui/Checkbox";
import { memo } from "react";
import { Icon } from "@/shared/ui/Icon/Icon";

const SteamLogin = memo(
  ({
    username,
    handleUsernameChange,
    handleBlur,
    data,

    emailInput,
    setEmailInput,
    isConfirmed,
    setIsConfirmed,
    isLoading,
    emailError,
    isEmailFocused,
    onEmailFocus,
    onEmailBlur,
  }: {
    username: string;
    handleUsernameChange: (value: string) => void;
    handleBlur: () => void;
    isLoading: boolean;
    data: SteamValidateAccountRes | null;

    emailInput: string;
    setEmailInput: (value: string) => void;
    isConfirmed: boolean;
    setIsConfirmed: (value: boolean) => void;
    emailError: string;
    isEmailFocused: boolean;
    onEmailFocus: () => void;
    onEmailBlur: () => void;
  }) => {
    return (
      <div className="w-full flex p-6 flex-col gap-4 card">
        <div className="w-full flex justify-between items-center">
          <Typography color="accent" variant="h3" className="font-bold text-lg">
            Пополнение Steam
          </Typography>
          <Link href="https://store.steampowered.com/account" target="_blank">
            <Button variant="ghost" className="underline">
              Как узнать логин?
            </Button>
          </Link>
        </div>

        <SteamLoginInput
          value={username}
          onChange={handleUsernameChange}
          onBlur={handleBlur}
          isFinded={data?.valid}
          isLoading={!data || isLoading}
        />

        <div className="w-full">
          <Input
            variant="primary"
            size="lg"
            type="email"
            placeholder="Введите почту"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onFocus={onEmailFocus}
            onBlur={onEmailBlur}
            iconRight={
              !isEmailFocused && emailInput && !emailError ? (
                <div className="flex items-center gap-2 bg-green-500/20 rounded-full px-2 py-1">
                  <Icon
                    name="tick-circle"
                    className="text-green-500"
                    size={12}
                  />
                  <span className="text-green-500 not-sm:hidden text-xs font-medium">
                    Корректный email
                  </span>
                </div>
              ) : null
            }
          />
          {!isEmailFocused && emailError && (
            <Typography
              color="red"
              variant="caption"
              className="text-red-500 text-xs mt-1"
            >
              {emailError}
            </Typography>
          )}
        </div>

        <Checkbox checked={isConfirmed} onCheckedChange={setIsConfirmed}>
          Я подтверждаю, что указал верный логин Steam и понимаю, что средства
          будут начислены на указанный аккаунт
        </Checkbox>
      </div>
    );
  }
);

SteamLogin.displayName = "SteamLogin";

export default SteamLogin;
