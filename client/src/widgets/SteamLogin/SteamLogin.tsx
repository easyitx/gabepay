"use client";
import Button from "@/shared/ui/Button/Button";
import { Typography } from "@/shared/ui/Typography";
import React, { useState } from "react";
import { SteamLoginInput } from "../SteamLoginInput/SteamLoginInput";
import { Input } from "@/shared/ui/Input";
import { Checkbox } from "@/shared/ui/Checkbox";
import { useSteamValidation } from "@/features/validateSteamAccount/model/hooks/useSteamValidation";

const SteamLogin = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const { validateSteamAccount, isLoading, error, data, reset } =
    useSteamValidation();

  const handleValidateSteamAccount = async () => {
    if (!username.trim()) {
      return;
    }
    await validateSteamAccount(username);
    console.log(data);
    console.log(error);
  };

  const handleBlur = () => {
    if (username.trim()) {
      handleValidateSteamAccount();
    }
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);

    if (data || error) {
      reset();
    }
  };

  return (
    <div className="w-full flex p-6 flex-col gap-4 card">
      <div className="w-full flex justify-between items-center">
        <Typography color="accent" variant="h3" className="font-bold text-lg">
          Пополнение Steam
        </Typography>
        <Button variant="ghost" className="underline">
          Как узнать логин?
        </Button>
      </div>

      <SteamLoginInput
        value={username}
        onChange={handleUsernameChange}
        onBlur={handleBlur}
        isFinded={!!data}
        isLoading={isLoading}
        hasError={!!error}
      />

      {error && <div className="text-sm text-red-500">{error.message}</div>}

      <Input
        variant="primary"
        size="lg"
        placeholder="Введите почту"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Checkbox checked={isConfirmed} onCheckedChange={setIsConfirmed}>
        Я подтверждаю, что указал верный логин Steam и понимаю, что средства
        будут начислены на указанный аккаунт
      </Checkbox>
    </div>
  );
};

export default SteamLogin;
