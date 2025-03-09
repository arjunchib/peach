import * as h from "./schema_helpers";

export class DiscordRestService {
  async get_my_oauth2_application(): Promise<any> {
    await h.fetchDiscord("get", "/oauth2/applications/@me", {});
  }
  async list_my_connections(): Promise<any> {
    await h.fetchDiscord("get", "/users/@me/connections", {});
  }
  async create_dm(): Promise<any> {
    await h.fetchDiscord("post", "/users/@me/channels", {});
  }
  async list_my_guilds(params: {
    before?: SnowflakeType;
    after?: SnowflakeType;
    limit?: number;
    with_counts?: boolean;
  }): Promise<any> {
    await h.fetchDiscord("get", "/users/@me/guilds", {
      before: params.before,
      after: params.after,
      limit: params.limit,
      with_counts: params.with_counts,
    });
  }
  async get_my_application(): Promise<any> {
    await h.fetchDiscord("get", "/applications/@me", {});
  }
  async update_my_application(): Promise<any> {
    await h.fetchDiscord("patch", "/applications/@me", {});
  }
  async get_bot_gateway(): Promise<any> {
    await h.fetchDiscord("get", "/gateway/bot", {});
  }
  async get_public_keys(): Promise<any> {
    await h.fetchDiscord("get", "/oauth2/keys", {});
  }
  async get_my_oauth2_authorization(): Promise<any> {
    await h.fetchDiscord("get", "/oauth2/@me", {});
  }
  async list_voice_regions(): Promise<any> {
    await h.fetchDiscord("get", "/voice/regions", {});
  }
  async get_my_user(): Promise<any> {
    await h.fetchDiscord("get", "/users/@me", {});
  }
  async update_my_user(): Promise<any> {
    await h.fetchDiscord("patch", "/users/@me", {});
  }
  async get_soundboard_default_sounds(): Promise<any> {
    await h.fetchDiscord("get", "/soundboard-default-sounds", {});
  }
  async create_stage_instance(): Promise<any> {
    await h.fetchDiscord("post", "/stage-instances", {});
  }
  async list_sticker_packs(): Promise<any> {
    await h.fetchDiscord("get", "/sticker-packs", {});
  }
  async get_gateway(): Promise<any> {
    await h.fetchDiscord("get", "/gateway", {});
  }
  async create_guild(): Promise<any> {
    await h.fetchDiscord("post", "/guilds", {});
  }
  async list_my_private_archived_threads(params: {
    channel_id: SnowflakeType;
    before?: SnowflakeType;
    limit?: number;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/channels/${params.channel_id}/users/@me/threads/archived/private`,
      { before: params.before, limit: params.limit },
    );
  }
  async list_guild_application_command_permissions(params: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/guilds/${params.guild_id}/commands/permissions`,
      {},
    );
  }
  async get_guild_application_command_permissions(params: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    command_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/guilds/${params.guild_id}/commands/${params.command_id}/permissions`,
      {},
    );
  }
  async set_guild_application_command_permissions(params: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    command_id: SnowflakeType;
    body: {
      permissions?: ApplicationCommandPermission[];
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/applications/${params.application_id}/guilds/${params.guild_id}/commands/${params.command_id}/permissions`,
      {},
    );
  }
  async delete_my_message_reaction(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    emoji_name: string;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji_name}/@me`,
      {},
    );
  }
  async add_my_message_reaction(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    emoji_name: string;
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji_name}/@me`,
      {},
    );
  }
  async list_private_archived_threads(params: {
    channel_id: SnowflakeType;
    before?: string;
    limit?: number;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/channels/${params.channel_id}/threads/archived/private`,
      { before: params.before, limit: params.limit },
    );
  }
  async list_public_archived_threads(params: {
    channel_id: SnowflakeType;
    before?: string;
    limit?: number;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/channels/${params.channel_id}/threads/archived/public`,
      { before: params.before, limit: params.limit },
    );
  }
  async delete_application_user_role_connection(params: {
    application_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/users/@me/applications/${params.application_id}/role-connection`,
      {},
    );
  }
  async get_application_user_role_connection(params: {
    application_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/users/@me/applications/${params.application_id}/role-connection`,
      {},
    );
  }
  async update_application_user_role_connection(params: {
    application_id: SnowflakeType;
    body: {
      platform_name?: string;
      platform_username?: string;
      metadata?: {
        [index: string]: string;
      };
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/users/@me/applications/${params.application_id}/role-connection`,
      {},
    );
  }
  async get_my_guild_member(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/users/@me/guilds/${params.guild_id}/member`,
      {},
    );
  }
  async get_application_role_connections_metadata(params: {
    application_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/role-connections/metadata`,
      {},
    );
  }
  async update_application_role_connections_metadata(params: {
    application_id: SnowflakeType;
    body: ApplicationRoleConnectionsMetadataItemRequest[] | null;
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/applications/${params.application_id}/role-connections/metadata`,
      {},
    );
  }
  async consume_entitlement(params: {
    application_id: SnowflakeType;
    entitlement_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/applications/${params.application_id}/entitlements/${params.entitlement_id}/consume`,
      {},
    );
  }
  async delete_guild_application_command(params: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    command_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/applications/${params.application_id}/guilds/${params.guild_id}/commands/${params.command_id}`,
      {},
    );
  }
  async get_guild_application_command(params: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    command_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/guilds/${params.guild_id}/commands/${params.command_id}`,
      {},
    );
  }
  async update_guild_application_command(params: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    command_id: SnowflakeType;
    body: ApplicationCommandPatchRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/applications/${params.application_id}/guilds/${params.guild_id}/commands/${params.command_id}`,
      {},
    );
  }
  async list_guild_application_commands(params: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    with_localizations?: boolean;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/guilds/${params.guild_id}/commands`,
      { with_localizations: params.with_localizations },
    );
  }
  async create_guild_application_command(params: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    body: ApplicationCommandCreateRequest;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/applications/${params.application_id}/guilds/${params.guild_id}/commands`,
      {},
    );
  }
  async bulk_set_guild_application_commands(params: {
    application_id: SnowflakeType;
    guild_id: SnowflakeType;
    body: ApplicationCommandUpdateRequest[] | null;
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/applications/${params.application_id}/guilds/${params.guild_id}/commands`,
      {},
    );
  }
  async leave_thread(params: { channel_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/channels/${params.channel_id}/thread-members/@me`,
      {},
    );
  }
  async join_thread(params: { channel_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/channels/${params.channel_id}/thread-members/@me`,
      {},
    );
  }
  async bulk_delete_messages(params: {
    channel_id: SnowflakeType;
    body: {
      messages: SnowflakeType[];
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/channels/${params.channel_id}/messages/bulk-delete`,
      {},
    );
  }
  async delete_user_message_reaction(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    emoji_name: string;
    user_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji_name}/${params.user_id}`,
      {},
    );
  }
  async delete_all_message_reactions_by_emoji(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    emoji_name: string;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji_name}`,
      {},
    );
  }
  async list_message_reactions_by_emoji(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    emoji_name: string;
    after?: SnowflakeType;
    limit?: number;
    type?: ReactionTypes;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/channels/${params.channel_id}/messages/${params.message_id}/reactions/${params.emoji_name}`,
      { after: params.after, limit: params.limit, type: params.type },
    );
  }
  async delete_all_message_reactions(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/channels/${params.channel_id}/messages/${params.message_id}/reactions`,
      {},
    );
  }
  async crosspost_message(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/channels/${params.channel_id}/messages/${params.message_id}/crosspost`,
      {},
    );
  }
  async create_thread_from_message(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    body: CreateTextThreadWithMessageRequest;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/channels/${params.channel_id}/messages/${params.message_id}/threads`,
      {},
    );
  }
  async get_answer_voters(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    answer_id: number;
    after?: SnowflakeType;
    limit?: number;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/channels/${params.channel_id}/polls/${params.message_id}/answers/${params.answer_id}`,
      { after: params.after, limit: params.limit },
    );
  }
  async poll_expire(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/channels/${params.channel_id}/polls/${params.message_id}/expire`,
      {},
    );
  }
  async delete_original_webhook_message(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    thread_id?: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/webhooks/${params.webhook_id}/${params.webhook_token}/messages/@original`,
      { thread_id: params.thread_id },
    );
  }
  async get_original_webhook_message(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    thread_id?: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/webhooks/${params.webhook_id}/${params.webhook_token}/messages/@original`,
      { thread_id: params.thread_id },
    );
  }
  async update_original_webhook_message(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    thread_id?: SnowflakeType;
    body: IncomingWebhookUpdateRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/webhooks/${params.webhook_id}/${params.webhook_token}/messages/@original`,
      { thread_id: params.thread_id },
    );
  }
  async list_guild_scheduled_event_users(params: {
    guild_id: SnowflakeType;
    guild_scheduled_event_id: SnowflakeType;
    with_member?: boolean;
    limit?: number;
    before?: SnowflakeType;
    after?: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/scheduled-events/${params.guild_scheduled_event_id}/users`,
      {
        with_member: params.with_member,
        limit: params.limit,
        before: params.before,
        after: params.after,
      },
    );
  }
  async delete_auto_moderation_rule(params: {
    guild_id: SnowflakeType;
    rule_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/auto-moderation/rules/${params.rule_id}`,
      {},
    );
  }
  async get_auto_moderation_rule(params: {
    guild_id: SnowflakeType;
    rule_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/auto-moderation/rules/${params.rule_id}`,
      {},
    );
  }
  async update_auto_moderation_rule(params: {
    guild_id: SnowflakeType;
    rule_id: SnowflakeType;
    body:
      | DefaultKeywordListUpsertRequestPartial
      | KeywordUpsertRequestPartial
      | MLSpamUpsertRequestPartial
      | MentionSpamUpsertRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/auto-moderation/rules/${params.rule_id}`,
      {},
    );
  }
  async list_auto_moderation_rules(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/auto-moderation/rules`,
      {},
    );
  }
  async create_auto_moderation_rule(params: {
    guild_id: SnowflakeType;
    body:
      | DefaultKeywordListUpsertRequest
      | KeywordUpsertRequest
      | MLSpamUpsertRequest
      | MentionSpamUpsertRequest;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/guilds/${params.guild_id}/auto-moderation/rules`,
      {},
    );
  }
  async get_self_voice_state(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/voice-states/@me`,
      {},
    );
  }
  async update_self_voice_state(params: {
    guild_id: SnowflakeType;
    body: {
      request_to_speak_timestamp?: string;
      suppress?: boolean;
      channel_id?: SnowflakeType;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/voice-states/@me`,
      {},
    );
  }
  async search_guild_members(params: {
    guild_id: SnowflakeType;
    limit: number;
    query: string;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/members/search`, {
      limit: params.limit,
      query: params.query,
    });
  }
  async get_active_guild_threads(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/threads/active`,
      {},
    );
  }
  async update_my_guild_member(params: {
    guild_id: SnowflakeType;
    body: {
      nick?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord("patch", `/guilds/${params.guild_id}/members/@me`, {});
  }
  async delete_guild_member_role(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
    role_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/members/${params.user_id}/roles/${params.role_id}`,
      {},
    );
  }
  async add_guild_member_role(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
    role_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/guilds/${params.guild_id}/members/${params.user_id}/roles/${params.role_id}`,
      {},
    );
  }
  async leave_guild(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("delete", `/users/@me/guilds/${params.guild_id}`, {});
  }
  async applications_get_activity_instance(params: {
    application_id: SnowflakeType;
    instance_id: string;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/activity-instances/${params.instance_id}`,
      {},
    );
  }
  async delete_entitlement(params: {
    application_id: SnowflakeType;
    entitlement_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/applications/${params.application_id}/entitlements/${params.entitlement_id}`,
      {},
    );
  }
  async get_entitlement(params: {
    application_id: SnowflakeType;
    entitlement_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/entitlements/${params.entitlement_id}`,
      {},
    );
  }
  async get_entitlements(params: {
    application_id: SnowflakeType;
    user_id?: SnowflakeType;
    sku_ids: string | (null | SnowflakeType)[];
    guild_id?: SnowflakeType;
    before?: SnowflakeType;
    after?: SnowflakeType;
    limit?: number;
    exclude_ended?: boolean;
    only_active?: boolean;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/entitlements`,
      {
        user_id: params.user_id,
        sku_ids: params.sku_ids,
        guild_id: params.guild_id,
        before: params.before,
        after: params.after,
        limit: params.limit,
        exclude_ended: params.exclude_ended,
        only_active: params.only_active,
      },
    );
  }
  async create_entitlement(params: {
    application_id: SnowflakeType;
    body: CreateEntitlementRequestData;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/applications/${params.application_id}/entitlements`,
      {},
    );
  }
  async upload_application_attachment(params: {
    application_id: SnowflakeType;
    body: any;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/applications/${params.application_id}/attachment`,
      {},
    );
  }
  async delete_application_command(params: {
    application_id: SnowflakeType;
    command_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/applications/${params.application_id}/commands/${params.command_id}`,
      {},
    );
  }
  async get_application_command(params: {
    application_id: SnowflakeType;
    command_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/commands/${params.command_id}`,
      {},
    );
  }
  async update_application_command(params: {
    application_id: SnowflakeType;
    command_id: SnowflakeType;
    body: ApplicationCommandPatchRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/applications/${params.application_id}/commands/${params.command_id}`,
      {},
    );
  }
  async list_application_commands(params: {
    application_id: SnowflakeType;
    with_localizations?: boolean;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/commands`,
      { with_localizations: params.with_localizations },
    );
  }
  async create_application_command(params: {
    application_id: SnowflakeType;
    body: ApplicationCommandCreateRequest;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/applications/${params.application_id}/commands`,
      {},
    );
  }
  async bulk_set_application_commands(params: {
    application_id: SnowflakeType;
    body: ApplicationCommandUpdateRequest[] | null;
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/applications/${params.application_id}/commands`,
      {},
    );
  }
  async delete_application_emoji(params: {
    application_id: SnowflakeType;
    emoji_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/applications/${params.application_id}/emojis/${params.emoji_id}`,
      {},
    );
  }
  async get_application_emoji(params: {
    application_id: SnowflakeType;
    emoji_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/emojis/${params.emoji_id}`,
      {},
    );
  }
  async update_application_emoji(params: {
    application_id: SnowflakeType;
    emoji_id: SnowflakeType;
    body: {
      name?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/applications/${params.application_id}/emojis/${params.emoji_id}`,
      {},
    );
  }
  async list_application_emojis(params: {
    application_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/applications/${params.application_id}/emojis`,
      {},
    );
  }
  async create_application_emoji(params: {
    application_id: SnowflakeType;
    body: {
      name: string;
      image: string;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/applications/${params.application_id}/emojis`,
      {},
    );
  }
  async create_interaction_response(params: {
    interaction_id: SnowflakeType;
    interaction_token: string;
    with_response?: boolean;
    body:
      | ApplicationCommandAutocompleteCallbackRequest
      | CreateMessageInteractionCallbackRequest
      | LaunchActivityInteractionCallbackRequest
      | ModalInteractionCallbackRequest
      | PongInteractionCallbackRequest
      | UpdateMessageInteractionCallbackRequest;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/interactions/${params.interaction_id}/${params.interaction_token}/callback`,
      { with_response: params.with_response },
    );
  }
  async send_soundboard_sound(params: {
    channel_id: SnowflakeType;
    body: SoundboardSoundSendRequest;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/channels/${params.channel_id}/send-soundboard-sound`,
      {},
    );
  }
  async delete_thread_member(params: {
    channel_id: SnowflakeType;
    user_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/channels/${params.channel_id}/thread-members/${params.user_id}`,
      {},
    );
  }
  async get_thread_member(params: {
    channel_id: SnowflakeType;
    user_id: SnowflakeType;
    with_member?: boolean;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/channels/${params.channel_id}/thread-members/${params.user_id}`,
      { with_member: params.with_member },
    );
  }
  async add_thread_member(params: {
    channel_id: SnowflakeType;
    user_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/channels/${params.channel_id}/thread-members/${params.user_id}`,
      {},
    );
  }
  async list_thread_members(params: {
    channel_id: SnowflakeType;
    with_member?: boolean;
    limit?: number;
    after?: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/channels/${params.channel_id}/thread-members`,
      {
        with_member: params.with_member,
        limit: params.limit,
        after: params.after,
      },
    );
  }
  async delete_channel_permission_overwrite(params: {
    channel_id: SnowflakeType;
    overwrite_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/channels/${params.channel_id}/permissions/${params.overwrite_id}`,
      {},
    );
  }
  async set_channel_permission_overwrite(params: {
    channel_id: SnowflakeType;
    overwrite_id: SnowflakeType;
    body: {
      type?: ChannelPermissionOverwrites;
      allow?: number;
      deny?: number;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/channels/${params.channel_id}/permissions/${params.overwrite_id}`,
      {},
    );
  }
  async delete_group_dm_user(params: {
    channel_id: SnowflakeType;
    user_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/channels/${params.channel_id}/recipients/${params.user_id}`,
      {},
    );
  }
  async add_group_dm_user(params: {
    channel_id: SnowflakeType;
    user_id: SnowflakeType;
    body: {
      access_token?: string;
      nick?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/channels/${params.channel_id}/recipients/${params.user_id}`,
      {},
    );
  }
  async follow_channel(params: {
    channel_id: SnowflakeType;
    body: {
      webhook_channel_id: SnowflakeType;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/channels/${params.channel_id}/followers`,
      {},
    );
  }
  async delete_message(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/channels/${params.channel_id}/messages/${params.message_id}`,
      {},
    );
  }
  async get_message(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/channels/${params.channel_id}/messages/${params.message_id}`,
      {},
    );
  }
  async update_message(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
    body: MessageEditRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/channels/${params.channel_id}/messages/${params.message_id}`,
      {},
    );
  }
  async list_messages(params: {
    channel_id: SnowflakeType;
    around?: SnowflakeType;
    before?: SnowflakeType;
    after?: SnowflakeType;
    limit?: number;
  }): Promise<any> {
    await h.fetchDiscord("get", `/channels/${params.channel_id}/messages`, {
      around: params.around,
      before: params.before,
      after: params.after,
      limit: params.limit,
    });
  }
  async create_message(params: {
    channel_id: SnowflakeType;
    body: MessageCreateRequest;
  }): Promise<any> {
    await h.fetchDiscord("post", `/channels/${params.channel_id}/messages`, {});
  }
  async list_channel_webhooks(params: {
    channel_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/channels/${params.channel_id}/webhooks`, {});
  }
  async create_webhook(params: {
    channel_id: SnowflakeType;
    body: {
      name: string;
      avatar?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord("post", `/channels/${params.channel_id}/webhooks`, {});
  }
  async list_channel_invites(params: {
    channel_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/channels/${params.channel_id}/invites`, {});
  }
  async create_channel_invite(params: {
    channel_id: SnowflakeType;
    body: CreateGroupDMInviteRequest | CreateGuildInviteRequest;
  }): Promise<any> {
    await h.fetchDiscord("post", `/channels/${params.channel_id}/invites`, {});
  }
  async create_thread(params: {
    channel_id: SnowflakeType;
    body: CreateForumThreadRequest | CreateTextThreadWithoutMessageRequest;
  }): Promise<any> {
    await h.fetchDiscord("post", `/channels/${params.channel_id}/threads`, {});
  }
  async trigger_typing_indicator(params: {
    channel_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("post", `/channels/${params.channel_id}/typing`, {});
  }
  async unpin_message(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/channels/${params.channel_id}/pins/${params.message_id}`,
      {},
    );
  }
  async pin_message(params: {
    channel_id: SnowflakeType;
    message_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/channels/${params.channel_id}/pins/${params.message_id}`,
      {},
    );
  }
  async list_pinned_messages(params: {
    channel_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/channels/${params.channel_id}/pins`, {});
  }
  async delete_webhook_message(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    message_id: SnowflakeType;
    thread_id?: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/webhooks/${params.webhook_id}/${params.webhook_token}/messages/${params.message_id}`,
      { thread_id: params.thread_id },
    );
  }
  async get_webhook_message(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    message_id: SnowflakeType;
    thread_id?: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/webhooks/${params.webhook_id}/${params.webhook_token}/messages/${params.message_id}`,
      { thread_id: params.thread_id },
    );
  }
  async update_webhook_message(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    message_id: SnowflakeType;
    thread_id?: SnowflakeType;
    body: IncomingWebhookUpdateRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/webhooks/${params.webhook_id}/${params.webhook_token}/messages/${params.message_id}`,
      { thread_id: params.thread_id },
    );
  }
  async execute_github_compatible_webhook(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    wait?: boolean;
    thread_id?: SnowflakeType;
    body: GithubWebhook;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/webhooks/${params.webhook_id}/${params.webhook_token}/github`,
      { wait: params.wait, thread_id: params.thread_id },
    );
  }
  async execute_slack_compatible_webhook(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    wait?: boolean;
    thread_id?: SnowflakeType;
    body: SlackWebhook;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/webhooks/${params.webhook_id}/${params.webhook_token}/slack`,
      { wait: params.wait, thread_id: params.thread_id },
    );
  }
  async get_guild_template(params: { code: string }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/templates/${params.code}`, {});
  }
  async create_guild_from_template(params: {
    code: string;
    body: {
      name: string;
      icon?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord("post", `/guilds/templates/${params.code}`, {});
  }
  async get_guild_new_member_welcome(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/new-member-welcome`,
      {},
    );
  }
  async delete_guild_soundboard_sound(params: {
    guild_id: SnowflakeType;
    sound_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/soundboard-sounds/${params.sound_id}`,
      {},
    );
  }
  async get_guild_soundboard_sound(params: {
    guild_id: SnowflakeType;
    sound_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/soundboard-sounds/${params.sound_id}`,
      {},
    );
  }
  async update_guild_soundboard_sound(params: {
    guild_id: SnowflakeType;
    sound_id: SnowflakeType;
    body: SoundboardPatchRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/soundboard-sounds/${params.sound_id}`,
      {},
    );
  }
  async list_guild_soundboard_sounds(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/soundboard-sounds`,
      {},
    );
  }
  async create_guild_soundboard_sound(params: {
    guild_id: SnowflakeType;
    body: SoundboardCreateRequest;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/guilds/${params.guild_id}/soundboard-sounds`,
      {},
    );
  }
  async delete_guild_scheduled_event(params: {
    guild_id: SnowflakeType;
    guild_scheduled_event_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/scheduled-events/${params.guild_scheduled_event_id}`,
      {},
    );
  }
  async get_guild_scheduled_event(params: {
    guild_id: SnowflakeType;
    guild_scheduled_event_id: SnowflakeType;
    with_user_count?: boolean;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/scheduled-events/${params.guild_scheduled_event_id}`,
      { with_user_count: params.with_user_count },
    );
  }
  async update_guild_scheduled_event(params: {
    guild_id: SnowflakeType;
    guild_scheduled_event_id: SnowflakeType;
    body:
      | ExternalScheduledEventPatchRequestPartial
      | StageScheduledEventPatchRequestPartial
      | VoiceScheduledEventPatchRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/scheduled-events/${params.guild_scheduled_event_id}`,
      {},
    );
  }
  async list_guild_scheduled_events(params: {
    guild_id: SnowflakeType;
    with_user_count?: boolean;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/scheduled-events`, {
      with_user_count: params.with_user_count,
    });
  }
  async create_guild_scheduled_event(params: {
    guild_id: SnowflakeType;
    body:
      | ExternalScheduledEventCreateRequest
      | StageScheduledEventCreateRequest
      | VoiceScheduledEventCreateRequest;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/guilds/${params.guild_id}/scheduled-events`,
      {},
    );
  }
  async get_guild_welcome_screen(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/welcome-screen`,
      {},
    );
  }
  async update_guild_welcome_screen(params: {
    guild_id: SnowflakeType;
    body: WelcomeScreenPatchRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/welcome-screen`,
      {},
    );
  }
  async get_voice_state(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/voice-states/${params.user_id}`,
      {},
    );
  }
  async update_voice_state(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
    body: {
      suppress?: boolean;
      channel_id?: SnowflakeType;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/voice-states/${params.user_id}`,
      {},
    );
  }
  async delete_guild_integration(params: {
    guild_id: SnowflakeType;
    integration_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/integrations/${params.integration_id}`,
      {},
    );
  }
  async list_guild_integrations(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/integrations`, {});
  }
  async get_guild_widget(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/widget.json`, {});
  }
  async get_guilds_onboarding(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/onboarding`, {});
  }
  async put_guilds_onboarding(params: {
    guild_id: SnowflakeType;
    body: UpdateGuildOnboardingRequest;
  }): Promise<any> {
    await h.fetchDiscord("put", `/guilds/${params.guild_id}/onboarding`, {});
  }
  async get_guild_vanity_url(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/vanity-url`, {});
  }
  async list_guild_audit_log_entries(params: {
    guild_id: SnowflakeType;
    user_id?: SnowflakeType;
    target_id?: SnowflakeType;
    action_type?: number;
    before?: SnowflakeType;
    after?: SnowflakeType;
    limit?: number;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/audit-logs`, {
      user_id: params.user_id,
      target_id: params.target_id,
      action_type: params.action_type,
      before: params.before,
      after: params.after,
      limit: params.limit,
    });
  }
  async get_guild_widget_png(params: {
    guild_id: SnowflakeType;
    style?: WidgetImageStyles;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/widget.png`, {
      style: params.style,
    });
  }
  async delete_guild_template(params: {
    guild_id: SnowflakeType;
    code: string;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/templates/${params.code}`,
      {},
    );
  }
  async update_guild_template(params: {
    guild_id: SnowflakeType;
    code: string;
    body: {
      name?: string;
      description?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/templates/${params.code}`,
      {},
    );
  }
  async sync_guild_template(params: {
    guild_id: SnowflakeType;
    code: string;
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/guilds/${params.guild_id}/templates/${params.code}`,
      {},
    );
  }
  async list_guild_templates(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/templates`, {});
  }
  async create_guild_template(params: {
    guild_id: SnowflakeType;
    body: {
      name: string;
      description?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord("post", `/guilds/${params.guild_id}/templates`, {});
  }
  async delete_guild_sticker(params: {
    guild_id: SnowflakeType;
    sticker_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/stickers/${params.sticker_id}`,
      {},
    );
  }
  async get_guild_sticker(params: {
    guild_id: SnowflakeType;
    sticker_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/stickers/${params.sticker_id}`,
      {},
    );
  }
  async update_guild_sticker(params: {
    guild_id: SnowflakeType;
    sticker_id: SnowflakeType;
    body: {
      name?: string;
      tags?: string;
      description?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/stickers/${params.sticker_id}`,
      {},
    );
  }
  async bulk_ban_users_from_guild(params: {
    guild_id: SnowflakeType;
    body: {
      user_ids: SnowflakeType[];
      delete_message_seconds?: number;
    };
  }): Promise<any> {
    await h.fetchDiscord("post", `/guilds/${params.guild_id}/bulk-ban`, {});
  }
  async list_guild_stickers(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/stickers`, {});
  }
  async create_guild_sticker(params: {
    guild_id: SnowflakeType;
    body: any;
  }): Promise<any> {
    await h.fetchDiscord("post", `/guilds/${params.guild_id}/stickers`, {});
  }
  async get_guild_webhooks(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/webhooks`, {});
  }
  async list_guild_channels(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/channels`, {});
  }
  async bulk_update_guild_channels(params: {
    guild_id: SnowflakeType;
    body: {
      id?: SnowflakeType;
      position?: number;
      parent_id?: SnowflakeType;
      lock_permissions?: boolean;
    }[];
  }): Promise<any> {
    await h.fetchDiscord("patch", `/guilds/${params.guild_id}/channels`, {});
  }
  async create_guild_channel(params: {
    guild_id: SnowflakeType;
    body: CreateGuildChannelRequest;
  }): Promise<any> {
    await h.fetchDiscord("post", `/guilds/${params.guild_id}/channels`, {});
  }
  async delete_guild_member(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/members/${params.user_id}`,
      {},
    );
  }
  async get_guild_member(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/members/${params.user_id}`,
      {},
    );
  }
  async update_guild_member(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
    body: {
      nick?: string;
      roles?: (null | SnowflakeType)[];
      mute?: boolean;
      deaf?: boolean;
      channel_id?: SnowflakeType;
      communication_disabled_until?: string;
      flags?: number;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/members/${params.user_id}`,
      {},
    );
  }
  async add_guild_member(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
    body: {
      nick?: string;
      roles?: (null | SnowflakeType)[];
      mute?: boolean;
      deaf?: boolean;
      access_token: string;
      flags?: number;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/guilds/${params.guild_id}/members/${params.user_id}`,
      {},
    );
  }
  async list_guild_members(params: {
    guild_id: SnowflakeType;
    limit?: number;
    after?: number;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/members`, {
      limit: params.limit,
      after: params.after,
    });
  }
  async get_guild_preview(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/preview`, {});
  }
  async list_guild_invites(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/invites`, {});
  }
  async list_guild_voice_regions(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/regions`, {});
  }
  async delete_guild_emoji(params: {
    guild_id: SnowflakeType;
    emoji_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/emojis/${params.emoji_id}`,
      {},
    );
  }
  async get_guild_emoji(params: {
    guild_id: SnowflakeType;
    emoji_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/emojis/${params.emoji_id}`,
      {},
    );
  }
  async update_guild_emoji(params: {
    guild_id: SnowflakeType;
    emoji_id: SnowflakeType;
    body: {
      name?: string;
      roles?: (null | SnowflakeType)[];
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/emojis/${params.emoji_id}`,
      {},
    );
  }
  async list_guild_emojis(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/emojis`, {});
  }
  async create_guild_emoji(params: {
    guild_id: SnowflakeType;
    body: {
      name: string;
      image: string;
      roles?: (null | SnowflakeType)[];
    };
  }): Promise<any> {
    await h.fetchDiscord("post", `/guilds/${params.guild_id}/emojis`, {});
  }
  async get_guild_widget_settings(params: {
    guild_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/widget`, {});
  }
  async update_guild_widget_settings(params: {
    guild_id: SnowflakeType;
    body: {
      channel_id?: SnowflakeType;
      enabled?: boolean;
    };
  }): Promise<any> {
    await h.fetchDiscord("patch", `/guilds/${params.guild_id}/widget`, {});
  }
  async delete_guild_role(params: {
    guild_id: SnowflakeType;
    role_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/roles/${params.role_id}`,
      {},
    );
  }
  async get_guild_role(params: {
    guild_id: SnowflakeType;
    role_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/roles/${params.role_id}`,
      {},
    );
  }
  async update_guild_role(params: {
    guild_id: SnowflakeType;
    role_id: SnowflakeType;
    body: {
      name?: string;
      permissions?: number;
      color?: number;
      hoist?: boolean;
      mentionable?: boolean;
      icon?: string;
      unicode_emoji?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/guilds/${params.guild_id}/roles/${params.role_id}`,
      {},
    );
  }
  async list_guild_roles(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/roles`, {});
  }
  async bulk_update_guild_roles(params: {
    guild_id: SnowflakeType;
    body: {
      id?: SnowflakeType;
      position?: number;
    }[];
  }): Promise<any> {
    await h.fetchDiscord("patch", `/guilds/${params.guild_id}/roles`, {});
  }
  async create_guild_role(params: {
    guild_id: SnowflakeType;
    body: {
      name?: string;
      permissions?: number;
      color?: number;
      hoist?: boolean;
      mentionable?: boolean;
      icon?: string;
      unicode_emoji?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord("post", `/guilds/${params.guild_id}/roles`, {});
  }
  async preview_prune_guild(params: {
    guild_id: SnowflakeType;
    days?: number;
    include_roles?: string | (null | SnowflakeType)[];
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/prune`, {
      days: params.days,
      include_roles: params.include_roles,
    });
  }
  async prune_guild(params: {
    guild_id: SnowflakeType;
    body: {
      days?: number;
      compute_prune_count?: boolean;
      include_roles?: string | (null | SnowflakeType)[];
    };
  }): Promise<any> {
    await h.fetchDiscord("post", `/guilds/${params.guild_id}/prune`, {});
  }
  async unban_user_from_guild(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/guilds/${params.guild_id}/bans/${params.user_id}`,
      {},
    );
  }
  async get_guild_ban(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/guilds/${params.guild_id}/bans/${params.user_id}`,
      {},
    );
  }
  async ban_user_from_guild(params: {
    guild_id: SnowflakeType;
    user_id: SnowflakeType;
    body: {
      delete_message_seconds?: number;
      delete_message_days?: number;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "put",
      `/guilds/${params.guild_id}/bans/${params.user_id}`,
      {},
    );
  }
  async list_guild_bans(params: {
    guild_id: SnowflakeType;
    limit?: number;
    before?: SnowflakeType;
    after?: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}/bans`, {
      limit: params.limit,
      before: params.before,
      after: params.after,
    });
  }
  async set_guild_mfa_level(params: {
    guild_id: SnowflakeType;
    body: {
      level: GuildMFALevel;
    };
  }): Promise<any> {
    await h.fetchDiscord("post", `/guilds/${params.guild_id}/mfa`, {});
  }
  async delete_stage_instance(params: {
    channel_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("delete", `/stage-instances/${params.channel_id}`, {});
  }
  async get_stage_instance(params: {
    channel_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/stage-instances/${params.channel_id}`, {});
  }
  async update_stage_instance(params: {
    channel_id: SnowflakeType;
    body: {
      topic?: string;
      privacy_level?: StageInstancesPrivacyLevels;
    };
  }): Promise<any> {
    await h.fetchDiscord("patch", `/stage-instances/${params.channel_id}`, {});
  }
  async get_sticker_pack(params: { pack_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/sticker-packs/${params.pack_id}`, {});
  }
  async get_application(params: {
    application_id: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/applications/${params.application_id}`, {});
  }
  async update_application(params: {
    application_id: SnowflakeType;
    body: ApplicationFormPartial;
  }): Promise<any> {
    await h.fetchDiscord("patch", `/applications/${params.application_id}`, {});
  }
  async delete_webhook_by_token(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
  }): Promise<any> {
    await h.fetchDiscord(
      "delete",
      `/webhooks/${params.webhook_id}/${params.webhook_token}`,
      {},
    );
  }
  async get_webhook_by_token(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
  }): Promise<any> {
    await h.fetchDiscord(
      "get",
      `/webhooks/${params.webhook_id}/${params.webhook_token}`,
      {},
    );
  }
  async update_webhook_by_token(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    body: {
      name?: string;
      avatar?: string;
    };
  }): Promise<any> {
    await h.fetchDiscord(
      "patch",
      `/webhooks/${params.webhook_id}/${params.webhook_token}`,
      {},
    );
  }
  async execute_webhook(params: {
    webhook_id: SnowflakeType;
    webhook_token: string;
    wait?: boolean;
    thread_id?: SnowflakeType;
    body: IncomingWebhookRequestPartial | IncomingWebhookUpdateRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord(
      "post",
      `/webhooks/${params.webhook_id}/${params.webhook_token}`,
      { wait: params.wait, thread_id: params.thread_id },
    );
  }
  async get_sticker(params: { sticker_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/stickers/${params.sticker_id}`, {});
  }
  async delete_webhook(params: { webhook_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("delete", `/webhooks/${params.webhook_id}`, {});
  }
  async get_webhook(params: { webhook_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/webhooks/${params.webhook_id}`, {});
  }
  async update_webhook(params: {
    webhook_id: SnowflakeType;
    body: {
      name?: string;
      avatar?: string;
      channel_id?: SnowflakeType;
    };
  }): Promise<any> {
    await h.fetchDiscord("patch", `/webhooks/${params.webhook_id}`, {});
  }
  async delete_channel(params: { channel_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("delete", `/channels/${params.channel_id}`, {});
  }
  async get_channel(params: { channel_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/channels/${params.channel_id}`, {});
  }
  async update_channel(params: {
    channel_id: SnowflakeType;
    body:
      | PrivateChannelRequestPartial
      | UpdateGuildChannelRequestPartial
      | UpdateThreadRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord("patch", `/channels/${params.channel_id}`, {});
  }
  async invite_revoke(params: { code: string }): Promise<any> {
    await h.fetchDiscord("delete", `/invites/${params.code}`, {});
  }
  async invite_resolve(params: {
    code: string;
    with_counts?: boolean;
    guild_scheduled_event_id?: SnowflakeType;
  }): Promise<any> {
    await h.fetchDiscord("get", `/invites/${params.code}`, {
      with_counts: params.with_counts,
      guild_scheduled_event_id: params.guild_scheduled_event_id,
    });
  }
  async delete_guild(params: { guild_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("delete", `/guilds/${params.guild_id}`, {});
  }
  async get_guild(params: {
    guild_id: SnowflakeType;
    with_counts?: boolean;
  }): Promise<any> {
    await h.fetchDiscord("get", `/guilds/${params.guild_id}`, {
      with_counts: params.with_counts,
    });
  }
  async update_guild(params: {
    guild_id: SnowflakeType;
    body: GuildPatchRequestPartial;
  }): Promise<any> {
    await h.fetchDiscord("patch", `/guilds/${params.guild_id}`, {});
  }
  async get_user(params: { user_id: SnowflakeType }): Promise<any> {
    await h.fetchDiscord("get", `/users/${params.user_id}`, {});
  }
}

export interface AccountResponse {
  id: string;
  name?: string;
}

export interface ActionRow {
  type: MessageComponentTypes.ACTION_ROW;
  components: (
    | Button
    | ChannelSelect
    | InputText
    | MentionableSelect
    | RoleSelect
    | StringSelect
    | UserSelect
  )[];
}

export interface ActivitiesAttachmentResponse {
  attachment: AttachmentResponse;
}

export enum ActivityLocationKinds {
  /** guild channel */
  GUILD_CHANNEL = "gc",
  /** private channel */
  PRIVATE_CHANNEL = "pc",
}

export enum AfkTimeouts {
  ONE_MINUTE = 60,
  FIVE_MINUTES = 300,
  FIFTEEN_MINUTES = 900,
  THIRTY_MINUTES = 1800,
  ONE_HOUR = 3600,
}

export enum AllowedMentionTypes {
  /** Controls role mentions */
  USERS = "users",
  /** Controls user mentions */
  ROLES = "roles",
  /** Controls @everyone and @here mentions */
  EVERYONE = "everyone",
}

export interface ApplicationCommandAttachmentOption {
  type: ApplicationCommandOptionType.ATTACHMENT;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
}

export interface ApplicationCommandAttachmentOptionResponse {
  type: ApplicationCommandOptionType.ATTACHMENT;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
}

export interface ApplicationCommandAutocompleteCallbackRequest {
  type: InteractionCallbackTypes.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT;
  data:
    | InteractionApplicationCommandAutocompleteCallbackIntegerData
    | InteractionApplicationCommandAutocompleteCallbackNumberData
    | InteractionApplicationCommandAutocompleteCallbackStringData;
}

export interface ApplicationCommandBooleanOption {
  type: ApplicationCommandOptionType.BOOLEAN;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
}

export interface ApplicationCommandBooleanOptionResponse {
  type: ApplicationCommandOptionType.BOOLEAN;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
}

export interface ApplicationCommandChannelOption {
  type: ApplicationCommandOptionType.CHANNEL;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  channel_types?: ChannelTypes[];
}

export interface ApplicationCommandChannelOptionResponse {
  type: ApplicationCommandOptionType.CHANNEL;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  channel_types?: ChannelTypes[];
}

export interface ApplicationCommandCreateRequest {
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description?: string;
  description_localizations?: {
    [index: string]: string;
  };
  options?: (
    | ApplicationCommandAttachmentOption
    | ApplicationCommandBooleanOption
    | ApplicationCommandChannelOption
    | ApplicationCommandIntegerOption
    | ApplicationCommandMentionableOption
    | ApplicationCommandNumberOption
    | ApplicationCommandRoleOption
    | ApplicationCommandStringOption
    | ApplicationCommandSubcommandGroupOption
    | ApplicationCommandSubcommandOption
    | ApplicationCommandUserOption
  )[];
  default_member_permissions?: number;
  dm_permission?: boolean;
  contexts?: InteractionContextType[];
  integration_types?: ApplicationIntegrationType[];
  handler?: ApplicationCommandHandler;
  type?: ApplicationCommandType;
}

export enum ApplicationCommandHandler {}

export interface ApplicationCommandIntegerOption {
  type: ApplicationCommandOptionType.INTEGER;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  autocomplete?: boolean;
  choices?: ApplicationCommandOptionIntegerChoice[];
  min_value?: number;
  max_value?: number;
}

export interface ApplicationCommandIntegerOptionResponse {
  type: ApplicationCommandOptionType.INTEGER;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  autocomplete?: boolean;
  choices?: ApplicationCommandOptionIntegerChoiceResponse[];
  min_value?: number;
  max_value?: number;
}

export interface ApplicationCommandInteractionMetadataResponse {
  id: SnowflakeType;
  type: InteractionTypes.APPLICATION_COMMAND;
  user?: UserResponse;
  authorizing_integration_owners: {
    [index: string]: SnowflakeType;
  };
  original_response_message_id?: SnowflakeType;
  target_user?: UserResponse;
  target_message_id?: SnowflakeType;
}

export interface ApplicationCommandMentionableOption {
  type: ApplicationCommandOptionType.MENTIONABLE;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
}

export interface ApplicationCommandMentionableOptionResponse {
  type: ApplicationCommandOptionType.MENTIONABLE;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
}

export interface ApplicationCommandNumberOption {
  type: ApplicationCommandOptionType.NUMBER;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  autocomplete?: boolean;
  choices?: ApplicationCommandOptionNumberChoice[];
  min_value?: number;
  max_value?: number;
}

export interface ApplicationCommandNumberOptionResponse {
  type: ApplicationCommandOptionType.NUMBER;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  autocomplete?: boolean;
  choices?: ApplicationCommandOptionNumberChoiceResponse[];
  min_value?: number;
  max_value?: number;
}

export interface ApplicationCommandOptionIntegerChoice {
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  value: number;
}

export interface ApplicationCommandOptionIntegerChoiceResponse {
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  value: number;
}

export interface ApplicationCommandOptionNumberChoice {
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  value: number;
}

export interface ApplicationCommandOptionNumberChoiceResponse {
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  value: number;
}

export interface ApplicationCommandOptionStringChoice {
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  value: string;
}

export interface ApplicationCommandOptionStringChoiceResponse {
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  value: string;
}

export enum ApplicationCommandOptionType {
  /** A sub-action within a command or group */
  SUB_COMMAND = 1,
  /** A group of subcommands */
  SUB_COMMAND_GROUP = 2,
  /** A string option */
  STRING = 3,
  /** An integer option. Any integer between -2^53 and 2^53 is a valid value */
  INTEGER = 4,
  /** A boolean option */
  BOOLEAN = 5,
  /** A snowflake option that represents a User */
  USER = 6,
  /** A snowflake option that represents a Channel. Includes all channel types and categories */
  CHANNEL = 7,
  /** A snowflake option that represents a Role */
  ROLE = 8,
  /** A snowflake option that represents anything you can mention */
  MENTIONABLE = 9,
  /** A number option. Any double between -2^53 and 2^53 is a valid value */
  NUMBER = 10,
  /** An attachment option */
  ATTACHMENT = 11,
}

export interface ApplicationCommandPatchRequestPartial {
  name?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description?: string;
  description_localizations?: {
    [index: string]: string;
  };
  options?: (
    | ApplicationCommandAttachmentOption
    | ApplicationCommandBooleanOption
    | ApplicationCommandChannelOption
    | ApplicationCommandIntegerOption
    | ApplicationCommandMentionableOption
    | ApplicationCommandNumberOption
    | ApplicationCommandRoleOption
    | ApplicationCommandStringOption
    | ApplicationCommandSubcommandGroupOption
    | ApplicationCommandSubcommandOption
    | ApplicationCommandUserOption
  )[];
  default_member_permissions?: number;
  dm_permission?: boolean;
  contexts?: InteractionContextType[];
  integration_types?: ApplicationIntegrationType[];
  handler?: ApplicationCommandHandler;
}

export interface ApplicationCommandPermission {
  id: SnowflakeType;
  type: ApplicationCommandPermissionType;
  permission: boolean;
}

export enum ApplicationCommandPermissionType {
  /** This permission is for a role. */
  ROLE = 1,
  /** This permission is for a user. */
  USER = 2,
  /** This permission is for a channel. */
  CHANNEL = 3,
}

export interface ApplicationCommandResponse {
  id: SnowflakeType;
  application_id: SnowflakeType;
  version: SnowflakeType;
  default_member_permissions?: string;
  type: ApplicationCommandType;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  guild_id?: SnowflakeType;
  dm_permission?: boolean;
  contexts?: InteractionContextType[];
  integration_types?: ApplicationIntegrationType[];
  options?: (
    | ApplicationCommandAttachmentOptionResponse
    | ApplicationCommandBooleanOptionResponse
    | ApplicationCommandChannelOptionResponse
    | ApplicationCommandIntegerOptionResponse
    | ApplicationCommandMentionableOptionResponse
    | ApplicationCommandNumberOptionResponse
    | ApplicationCommandRoleOptionResponse
    | ApplicationCommandStringOptionResponse
    | ApplicationCommandSubcommandGroupOptionResponse
    | ApplicationCommandSubcommandOptionResponse
    | ApplicationCommandUserOptionResponse
  )[];
  nsfw?: boolean;
}

export interface ApplicationCommandRoleOption {
  type: ApplicationCommandOptionType.ROLE;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
}

export interface ApplicationCommandRoleOptionResponse {
  type: ApplicationCommandOptionType.ROLE;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
}

export interface ApplicationCommandStringOption {
  type: ApplicationCommandOptionType.STRING;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  autocomplete?: boolean;
  min_length?: number;
  max_length?: number;
  choices?: ApplicationCommandOptionStringChoice[];
}

export interface ApplicationCommandStringOptionResponse {
  type: ApplicationCommandOptionType.STRING;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  autocomplete?: boolean;
  choices?: ApplicationCommandOptionStringChoiceResponse[];
  min_length?: number;
  max_length?: number;
}

export interface ApplicationCommandSubcommandGroupOption {
  type: ApplicationCommandOptionType.SUB_COMMAND_GROUP;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  options?: ApplicationCommandSubcommandOption[];
}

export interface ApplicationCommandSubcommandGroupOptionResponse {
  type: ApplicationCommandOptionType.SUB_COMMAND_GROUP;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  options?: ApplicationCommandSubcommandOptionResponse[];
}

export interface ApplicationCommandSubcommandOption {
  type: ApplicationCommandOptionType.SUB_COMMAND;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  options?: (
    | ApplicationCommandAttachmentOption
    | ApplicationCommandBooleanOption
    | ApplicationCommandChannelOption
    | ApplicationCommandIntegerOption
    | ApplicationCommandMentionableOption
    | ApplicationCommandNumberOption
    | ApplicationCommandRoleOption
    | ApplicationCommandStringOption
    | ApplicationCommandUserOption
  )[];
}

export interface ApplicationCommandSubcommandOptionResponse {
  type: ApplicationCommandOptionType.SUB_COMMAND;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
  options?: (
    | ApplicationCommandAttachmentOptionResponse
    | ApplicationCommandBooleanOptionResponse
    | ApplicationCommandChannelOptionResponse
    | ApplicationCommandIntegerOptionResponse
    | ApplicationCommandMentionableOptionResponse
    | ApplicationCommandNumberOptionResponse
    | ApplicationCommandRoleOptionResponse
    | ApplicationCommandStringOptionResponse
    | ApplicationCommandUserOptionResponse
  )[];
}

export enum ApplicationCommandType {
  /** Slash commands; a text-based command that shows up when a user types / */
  CHAT = 1,
  /** A UI-based command that shows up when you right click or tap on a user */
  USER = 2,
  /** A UI-based command that shows up when you right click or tap on a message */
  MESSAGE = 3,
  /** A command that represents the primary way to use an application (e.g. launching an Activity) */
  PRIMARY_ENTRY_POINT = 4,
}

export interface ApplicationCommandUpdateRequest {
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description?: string;
  description_localizations?: {
    [index: string]: string;
  };
  options?: (
    | ApplicationCommandAttachmentOption
    | ApplicationCommandBooleanOption
    | ApplicationCommandChannelOption
    | ApplicationCommandIntegerOption
    | ApplicationCommandMentionableOption
    | ApplicationCommandNumberOption
    | ApplicationCommandRoleOption
    | ApplicationCommandStringOption
    | ApplicationCommandSubcommandGroupOption
    | ApplicationCommandSubcommandOption
    | ApplicationCommandUserOption
  )[];
  default_member_permissions?: number;
  dm_permission?: boolean;
  contexts?: InteractionContextType[];
  integration_types?: ApplicationIntegrationType[];
  handler?: ApplicationCommandHandler;
  type?: ApplicationCommandType;
  id?: SnowflakeType;
}

export interface ApplicationCommandUserOption {
  type: ApplicationCommandOptionType.USER;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
}

export interface ApplicationCommandUserOptionResponse {
  type: ApplicationCommandOptionType.USER;
  name: string;
  name_localized?: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localized?: string;
  description_localizations?: {
    [index: string]: string;
  };
  required?: boolean;
}

export enum ApplicationExplicitContentFilterTypes {
  /** inherit guild content filter setting */
  INHERIT = 0,
  /** interactions will always be scanned */
  ALWAYS = 1,
}

export interface ApplicationFormPartial {
  description?: {
    default: string;
    localizations?: {
      [index: string]: string;
    };
  };
  icon?: string;
  cover_image?: string;
  team_id?: SnowflakeType;
  flags?: number;
  interactions_endpoint_url?: string;
  explicit_content_filter?: ApplicationExplicitContentFilterTypes;
  max_participants?: number;
  type?: ApplicationTypes;
  tags?: string[];
  custom_install_url?: string;
  install_params?: ApplicationOAuth2InstallParams;
  role_connections_verification_url?: string;
  integration_types_config?: {
    [index: string]: null | ApplicationIntegrationTypeConfiguration;
  };
}

export interface ApplicationIncomingWebhookResponse {
  application_id?: SnowflakeType;
  avatar?: string;
  channel_id?: SnowflakeType;
  guild_id?: SnowflakeType;
  id: SnowflakeType;
  name: string;
  type: WebhookTypes.APPLICATION_INCOMING;
  user?: UserResponse;
}

export enum ApplicationIntegrationType {}

export interface ApplicationIntegrationTypeConfiguration {
  oauth2_install_params?: ApplicationOAuth2InstallParams;
}

export interface ApplicationIntegrationTypeConfigurationResponse {
  oauth2_install_params?: ApplicationOAuth2InstallParamsResponse;
}

export interface ApplicationOAuth2InstallParams {
  scopes?: (OAuth2Scopes.APPLICATIONS_COMMANDS | OAuth2Scopes.BOT)[];
  permissions?: number;
}

export interface ApplicationOAuth2InstallParamsResponse {
  scopes: (OAuth2Scopes.APPLICATIONS_COMMANDS | OAuth2Scopes.BOT)[];
  permissions: string;
}

export interface ApplicationResponse {
  id: SnowflakeType;
  name: string;
  icon?: string;
  description: string;
  type?: ApplicationTypes;
  cover_image?: string;
  primary_sku_id?: SnowflakeType;
  bot?: UserResponse;
  slug?: string;
  guild_id?: SnowflakeType;
  rpc_origins?: (string | null)[];
  bot_public?: boolean;
  bot_require_code_grant?: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  custom_install_url?: string;
  install_params?: ApplicationOAuth2InstallParamsResponse;
  integration_types_config?: {
    [index: string]: ApplicationIntegrationTypeConfigurationResponse;
  };
  verify_key: string;
  flags: number;
  max_participants?: number;
  tags?: string[];
}

export interface ApplicationRoleConnectionsMetadataItemRequest {
  type: MetadataItemTypes;
  key: string;
  name: string;
  name_localizations?: {
    [index: string]: string | null;
  };
  description: string;
  description_localizations?: {
    [index: string]: string | null;
  };
}

export interface ApplicationRoleConnectionsMetadataItemResponse {
  type: MetadataItemTypes;
  key: string;
  name: string;
  name_localizations?: {
    [index: string]: string;
  };
  description: string;
  description_localizations?: {
    [index: string]: string;
  };
}

export enum ApplicationTypes {
  GUILD_ROLE_SUBSCRIPTIONS = 4,
}

export interface ApplicationUserRoleConnectionResponse {
  platform_name?: string;
  platform_username?: string;
  metadata?: {
    [index: string]: string;
  };
}

export interface AttachmentResponse {
  id: SnowflakeType;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  width?: number;
  height?: number;
  duration_secs?: number;
  waveform?: string;
  description?: string;
  content_type?: string;
  ephemeral?: boolean;
  title?: string;
  application?: ApplicationResponse;
  clip_created_at?: string;
  clip_participants?: UserResponse[];
}

export enum AuditLogActionTypes {
  GUILD_UPDATE = 1,
  CHANNEL_CREATE = 10,
  CHANNEL_UPDATE = 11,
  CHANNEL_DELETE = 12,
  CHANNEL_OVERWRITE_CREATE = 13,
  CHANNEL_OVERWRITE_UPDATE = 14,
  CHANNEL_OVERWRITE_DELETE = 15,
  MEMBER_KICK = 20,
  MEMBER_PRUNE = 21,
  MEMBER_BAN_ADD = 22,
  MEMBER_BAN_REMOVE = 23,
  MEMBER_UPDATE = 24,
  MEMBER_ROLE_UPDATE = 25,
  MEMBER_MOVE = 26,
  MEMBER_DISCONNECT = 27,
  BOT_ADD = 28,
  ROLE_CREATE = 30,
  ROLE_UPDATE = 31,
  ROLE_DELETE = 32,
  INVITE_CREATE = 40,
  INVITE_UPDATE = 41,
  INVITE_DELETE = 42,
  WEBHOOK_CREATE = 50,
  WEBHOOK_UPDATE = 51,
  WEBHOOK_DELETE = 52,
  EMOJI_CREATE = 60,
  EMOJI_UPDATE = 61,
  EMOJI_DELETE = 62,
  MESSAGE_DELETE = 72,
  MESSAGE_BULK_DELETE = 73,
  MESSAGE_PIN = 74,
  MESSAGE_UNPIN = 75,
  INTEGRATION_CREATE = 80,
  INTEGRATION_UPDATE = 81,
  INTEGRATION_DELETE = 82,
  STAGE_INSTANCE_CREATE = 83,
  STAGE_INSTANCE_UPDATE = 84,
  STAGE_INSTANCE_DELETE = 85,
  STICKER_CREATE = 90,
  STICKER_UPDATE = 91,
  STICKER_DELETE = 92,
  GUILD_SCHEDULED_EVENT_CREATE = 100,
  GUILD_SCHEDULED_EVENT_UPDATE = 101,
  GUILD_SCHEDULED_EVENT_DELETE = 102,
  THREAD_CREATE = 110,
  THREAD_UPDATE = 111,
  THREAD_DELETE = 112,
  APPLICATION_COMMAND_PERMISSION_UPDATE = 121,
  SOUNDBOARD_SOUND_CREATE = 130,
  SOUNDBOARD_SOUND_UPDATE = 131,
  SOUNDBOARD_SOUND_DELETE = 132,
  AUTO_MODERATION_RULE_CREATE = 140,
  AUTO_MODERATION_RULE_UPDATE = 141,
  AUTO_MODERATION_RULE_DELETE = 142,
  AUTO_MODERATION_BLOCK_MESSAGE = 143,
  AUTO_MODERATION_FLAG_TO_CHANNEL = 144,
  AUTO_MODERATION_USER_COMM_DISABLED = 145,
  AUTO_MODERATION_QUARANTINE_USER = 146,
  CREATOR_MONETIZATION_REQUEST_CREATED = 150,
  CREATOR_MONETIZATION_TERMS_ACCEPTED = 151,
  ONBOARDING_PROMPT_CREATE = 163,
  ONBOARDING_PROMPT_UPDATE = 164,
  ONBOARDING_PROMPT_DELETE = 165,
  ONBOARDING_CREATE = 166,
  ONBOARDING_UPDATE = 167,
  GUILD_HOME_FEATURE_ITEM = 171,
  GUILD_HOME_REMOVE_ITEM = 172,
  HARMFUL_LINKS_BLOCKED_MESSAGE = 180,
  HOME_SETTINGS_CREATE = 190,
  HOME_SETTINGS_UPDATE = 191,
  VOICE_CHANNEL_STATUS_CREATE = 192,
  VOICE_CHANNEL_STATUS_DELETE = 193,
}

export interface AuditLogEntryResponse {
  id: SnowflakeType;
  action_type: AuditLogActionTypes;
  user_id?: SnowflakeType;
  target_id?: SnowflakeType;
  changes?: AuditLogObjectChangeResponse[];
  options?: {
    [index: string]: string;
  };
  reason?: string;
}

export interface AuditLogObjectChangeResponse {
  key?: string;
  new_value?: any;
  old_value?: any;
}

export enum AutomodActionType {
  /** Block a user's message and prevent it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked */
  BLOCK_MESSAGE = 1,
  /** Send a system message to a channel in order to log the user message that triggered the rule */
  FLAG_TO_CHANNEL = 2,
  /** Temporarily disable a user's ability to communicate in the server (timeout) */
  USER_COMMUNICATION_DISABLED = 3,
  /** Prevent a user from interacting in the server */
  QUARANTINE_USER = 4,
}

export enum AutomodEventType {
  /** A user submitted a message to a channel */
  MESSAGE_SEND = 1,
  /** A user is attempting to join the server or a member's properties were updated. */
  GUILD_MEMBER_JOIN_OR_UPDATE = 2,
}

export enum AutomodKeywordPresetType {
  /** Words and phrases that may be considered profanity */
  PROFANITY = 1,
  /** Words and phrases that may be considered as sexual content */
  SEXUAL_CONTENT = 2,
  /** Words and phrases that may be considered slurs and hate speech */
  SLURS = 3,
}

export enum AutomodTriggerType {
  /** Check if content contains words from a list of keywords or matches regex */
  KEYWORD = 1,
  /** DEPRECATED */
  SPAM_LINK = 2,
  /** Check if content represents generic spam */
  ML_SPAM = 3,
  /** Check if content contains words from internal pre-defined wordsets */
  DEFAULT_KEYWORD_LIST = 4,
  /** Check if content contains more unique mentions than allowed */
  MENTION_SPAM = 5,
}

export enum AvailableLocalesEnum {
  /** The ar locale */
  ar = "ar",
  /** The bg locale */
  bg = "bg",
  /** The cs locale */
  cs = "cs",
  /** The da locale */
  da = "da",
  /** The de locale */
  de = "de",
  /** The el locale */
  el = "el",
  /** The en-GB locale */
  enGB = "en-GB",
  /** The en-US locale */
  enUS = "en-US",
  /** The es-419 locale */
  es419 = "es-419",
  /** The es-ES locale */
  esES = "es-ES",
  /** The fi locale */
  fi = "fi",
  /** The fr locale */
  fr = "fr",
  /** The he locale */
  he = "he",
  /** The hi locale */
  hi = "hi",
  /** The hr locale */
  hr = "hr",
  /** The hu locale */
  hu = "hu",
  /** The id locale */
  id = "id",
  /** The it locale */
  it = "it",
  /** The ja locale */
  ja = "ja",
  /** The ko locale */
  ko = "ko",
  /** The lt locale */
  lt = "lt",
  /** The nl locale */
  nl = "nl",
  /** The no locale */
  no = "no",
  /** The pl locale */
  pl = "pl",
  /** The pt-BR locale */
  ptBR = "pt-BR",
  /** The ro locale */
  ro = "ro",
  /** The ru locale */
  ru = "ru",
  /** The sv-SE locale */
  svSE = "sv-SE",
  /** The th locale */
  th = "th",
  /** The tr locale */
  tr = "tr",
  /** The uk locale */
  uk = "uk",
  /** The vi locale */
  vi = "vi",
  /** The zh-CN locale */
  zhCN = "zh-CN",
  /** The zh-TW locale */
  zhTW = "zh-TW",
}

export interface BaseCreateMessageCreateRequest {
  content?: string;
  embeds?: RichEmbed[];
  allowed_mentions?: MessageAllowedMentionsRequest;
  sticker_ids?: SnowflakeType[];
  components?: ActionRow[];
  flags?: number;
  attachments?: MessageAttachmentRequest[];
  poll?: PollCreateRequest;
}

export interface BasicApplicationResponse {
  id: SnowflakeType;
  name: string;
  icon?: string;
  description: string;
  type?: ApplicationTypes;
  cover_image?: string;
  primary_sku_id?: SnowflakeType;
  bot?: UserResponse;
}

export interface BasicMessageResponse {
  type: MessageType;
  content: string;
  mentions: UserResponse[];
  mention_roles: SnowflakeType[];
  attachments: MessageAttachmentResponse[];
  embeds: MessageEmbedResponse[];
  timestamp: string;
  edited_timestamp?: string;
  flags: number;
  components: (
    | MessageComponentActionRowResponse
    | MessageComponentButtonResponse
    | MessageComponentChannelSelectResponse
    | MessageComponentInputTextResponse
    | MessageComponentMentionableSelectResponse
    | MessageComponentRoleSelectResponse
    | MessageComponentStringSelectResponse
    | MessageComponentUserSelectResponse
  )[];
  resolved?: ResolvedObjectsResponse;
  stickers?: (GuildStickerResponse | StandardStickerResponse)[];
  sticker_items?: MessageStickerItemResponse[];
  id: SnowflakeType;
  channel_id: SnowflakeType;
  author: UserResponse;
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  call?: MessageCallResponse;
  activity?: MessageActivityResponse;
  application?: BasicApplicationResponse;
  application_id?: SnowflakeType;
  interaction?: MessageInteractionResponse;
  nonce?: number | string;
  webhook_id?: SnowflakeType;
  message_reference?: MessageReferenceResponse;
  thread?: ThreadResponse;
  mention_channels?: (null | MessageMentionChannelResponse)[];
  role_subscription_data?: MessageRoleSubscriptionDataResponse;
  purchase_notification?: PurchaseNotificationResponse;
  position?: number;
  poll?: PollResponse;
  interaction_metadata?:
    | ApplicationCommandInteractionMetadataResponse
    | MessageComponentInteractionMetadataResponse
    | ModalSubmitInteractionMetadataResponse;
  message_snapshots?: MessageSnapshotResponse[];
}

export interface BlockMessageAction {
  type: AutomodActionType.BLOCK_MESSAGE;
  metadata?: BlockMessageActionMetadata;
}

export interface BlockMessageActionMetadata {
  custom_message?: string;
}

export interface BlockMessageActionMetadataResponse {
  custom_message?: string;
}

export interface BlockMessageActionResponse {
  type: AutomodActionType.BLOCK_MESSAGE;
  metadata: BlockMessageActionMetadataResponse;
}

export interface BotAccountPatchRequest {
  username: string;
  avatar?: string;
  banner?: string;
}

export interface BulkBanUsersResponse {
  banned_users: SnowflakeType[];
  failed_users: SnowflakeType[];
}

export interface Button {
  type: MessageComponentTypes.BUTTON;
  custom_id?: string;
  style: ButtonStyleTypes;
  label?: string;
  disabled?: boolean;
  emoji?: Emoji;
  url?: string;
  sku_id?: SnowflakeType;
}

export enum ButtonStyleTypes {
  PRIMARY = 1,
  SECONDARY = 2,
  SUCCESS = 3,
  DANGER = 4,
  LINK = 5,
  PREMIUM = 6,
}

export interface ChannelFollowerResponse {
  channel_id: SnowflakeType;
  webhook_id: SnowflakeType;
}

export interface ChannelFollowerWebhookResponse {
  application_id?: SnowflakeType;
  avatar?: string;
  channel_id?: SnowflakeType;
  guild_id?: SnowflakeType;
  id: SnowflakeType;
  name: string;
  type: WebhookTypes.CHANNEL_FOLLOWER;
  user?: UserResponse;
  source_guild?: WebhookSourceGuildResponse;
  source_channel?: WebhookSourceChannelResponse;
}

export interface ChannelPermissionOverwriteRequest {
  id: SnowflakeType;
  type?: ChannelPermissionOverwrites;
  allow?: number;
  deny?: number;
}

export interface ChannelPermissionOverwriteResponse {
  id: SnowflakeType;
  type: ChannelPermissionOverwrites;
  allow: string;
  deny: string;
}

export enum ChannelPermissionOverwrites {
  ROLE = 0,
  MEMBER = 1,
}

export interface ChannelSelect {
  type: MessageComponentTypes.CHANNEL_SELECT;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  default_values?: ChannelSelectDefaultValue[];
  channel_types?: ChannelTypes[];
}

export interface ChannelSelectDefaultValue {
  type: SnowflakeSelectDefaultValueTypes.CHANNEL;
  id: SnowflakeType;
}

export interface ChannelSelectDefaultValueResponse {
  type: SnowflakeSelectDefaultValueTypes.CHANNEL;
  id: SnowflakeType;
}

export enum ChannelTypes {
  /** A direct message between users */
  DM = 1,
  /** A direct message between multiple users */
  GROUP_DM = 3,
  /** A text channel within a server */
  GUILD_TEXT = 0,
  /** A voice channel within a server */
  GUILD_VOICE = 2,
  /** An organizational category that contains up to 50 channels */
  GUILD_CATEGORY = 4,
  /** A channel that users can follow and crosspost into their own server (formerly news channels) */
  GUILD_ANNOUNCEMENT = 5,
  /** A temporary sub-channel within a GUILD_ANNOUNCEMENT channel */
  ANNOUNCEMENT_THREAD = 10,
  /** A temporary sub-channel within a GUILD_TEXT or GUILD_THREADS_ONLY channel type set */
  PUBLIC_THREAD = 11,
  /** A temporary sub-channel within a GUILD_TEXT channel that is only viewable by those invited and those with the MANAGE_THREADS permission */
  PRIVATE_THREAD = 12,
  /** A voice channel for hosting events with an audience */
  GUILD_STAGE_VOICE = 13,
  /** The channel in a hub containing the listed servers */
  GUILD_DIRECTORY = 14,
  /** Channel that can only contain threads */
  GUILD_FORUM = 15,
}

export interface CommandPermissionResponse {
  id: SnowflakeType;
  type: ApplicationCommandPermissionType;
  permission: boolean;
}

export interface CommandPermissionsResponse {
  id: SnowflakeType;
  application_id: SnowflakeType;
  guild_id: SnowflakeType;
  permissions: CommandPermissionResponse[];
}

export interface ConnectedAccountGuildResponse {
  id: SnowflakeType;
  name: string;
  icon?: string;
}

export interface ConnectedAccountIntegrationResponse {
  id: string;
  type: IntegrationTypes;
  account: AccountResponse;
  guild: ConnectedAccountGuildResponse;
}

export enum ConnectedAccountProviders {
  BATTLENET = "battlenet",
  BUNGIE = "bungie",
  EBAY = "ebay",
  EPIC_GAMES = "epicgames",
  FACEBOOK = "facebook",
  GITHUB = "github",
  INSTAGRAM = "instagram",
  LEAGUE_OF_LEGENDS = "leagueoflegends",
  PAYPAL = "paypal",
  PLAYSTATION = "playstation",
  REDDIT = "reddit",
  RIOT_GAMES = "riotgames",
  ROBLOX = "roblox",
  SKYPE = "skype",
  SPOTIFY = "spotify",
  STEAM = "steam",
  TIKTOK = "tiktok",
  TWITCH = "twitch",
  TWITTER = "twitter",
  XBOX = "xbox",
  YOUTUBE = "youtube",
  DOMAIN = "domain",
}

export interface ConnectedAccountResponse {
  id: string;
  name?: string;
  type: ConnectedAccountProviders;
  friend_sync: boolean;
  integrations?: ConnectedAccountIntegrationResponse[];
  show_activity: boolean;
  two_way_link: boolean;
  verified: boolean;
  visibility: ConnectedAccountVisibility;
  revoked?: boolean;
}

export enum ConnectedAccountVisibility {
  NONE = 0,
  EVERYONE = 1,
}

export interface CreateEntitlementRequestData {
  sku_id: SnowflakeType;
  owner_id: SnowflakeType;
  owner_type: EntitlementOwnerTypes;
}

export interface CreateForumThreadRequest {
  name: string;
  auto_archive_duration?: ThreadAutoArchiveDuration;
  rate_limit_per_user?: number;
  applied_tags?: SnowflakeType[];
  message: BaseCreateMessageCreateRequest;
}

export interface CreateGroupDMInviteRequest {
  max_age?: number;
}

export interface CreateGuildChannelRequest {
  type?:
    | ChannelTypes.GUILD_TEXT
    | ChannelTypes.GUILD_VOICE
    | ChannelTypes.GUILD_CATEGORY
    | ChannelTypes.GUILD_ANNOUNCEMENT
    | ChannelTypes.GUILD_STAGE_VOICE
    | ChannelTypes.GUILD_DIRECTORY
    | ChannelTypes.GUILD_FORUM;
  name: string;
  position?: number;
  topic?: string;
  bitrate?: number;
  user_limit?: number;
  nsfw?: boolean;
  rate_limit_per_user?: number;
  parent_id?: SnowflakeType;
  permission_overwrites?: ChannelPermissionOverwriteRequest[];
  rtc_region?: string;
  video_quality_mode?: VideoQualityModes;
  default_auto_archive_duration?: ThreadAutoArchiveDuration;
  default_reaction_emoji?: UpdateDefaultReactionEmojiRequest;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: ThreadSortOrder;
  default_forum_layout?: ForumLayout;
  available_tags?: (null | CreateOrUpdateThreadTagRequest)[];
}

export interface CreateGuildInviteRequest {
  max_age?: number;
  temporary?: boolean;
  max_uses?: number;
  unique?: boolean;
  target_user_id?: SnowflakeType;
  target_application_id?: SnowflakeType;
  target_type?:
    | InviteTargetTypes.STREAM
    | InviteTargetTypes.EMBEDDED_APPLICATION;
}

export interface CreateGuildRequestChannelItem {
  type?:
    | ChannelTypes.GUILD_TEXT
    | ChannelTypes.GUILD_VOICE
    | ChannelTypes.GUILD_CATEGORY;
  name: string;
  position?: number;
  topic?: string;
  bitrate?: number;
  user_limit?: number;
  nsfw?: boolean;
  rate_limit_per_user?: number;
  parent_id?: SnowflakeType;
  permission_overwrites?: ChannelPermissionOverwriteRequest[];
  rtc_region?: string;
  video_quality_mode?: VideoQualityModes;
  default_auto_archive_duration?: ThreadAutoArchiveDuration;
  default_reaction_emoji?: UpdateDefaultReactionEmojiRequest;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: ThreadSortOrder;
  default_forum_layout?: ForumLayout;
  id?: SnowflakeType;
  available_tags?: CreateOrUpdateThreadTagRequest[];
}

export interface CreateGuildRequestRoleItem {
  id: number;
  name?: string;
  permissions?: number;
  color?: number;
  hoist?: boolean;
  mentionable?: boolean;
  unicode_emoji?: string;
}

export interface CreateMessageInteractionCallbackRequest {
  type:
    | InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE
    | InteractionCallbackTypes.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE;
  data?: IncomingWebhookInteractionRequest;
}

export interface CreateMessageInteractionCallbackResponse {
  type: InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE;
  message: MessageResponse;
}

export interface CreateOrUpdateThreadTagRequest {
  name: string;
  emoji_id?: SnowflakeType;
  emoji_name?: string;
  moderated?: boolean;
}

export interface CreatePrivateChannelRequest {
  recipient_id?: SnowflakeType;
  access_tokens?: string[];
  nicks?: {
    [index: string]: string | null;
  };
}

export interface CreateTextThreadWithMessageRequest {
  name: string;
  auto_archive_duration?: ThreadAutoArchiveDuration;
  rate_limit_per_user?: number;
}

export interface CreateTextThreadWithoutMessageRequest {
  name: string;
  auto_archive_duration?: ThreadAutoArchiveDuration;
  rate_limit_per_user?: number;
  type?:
    | ChannelTypes.ANNOUNCEMENT_THREAD
    | ChannelTypes.PUBLIC_THREAD
    | ChannelTypes.PRIVATE_THREAD;
  invitable?: boolean;
}

export interface CreatedThreadResponse {
  id: SnowflakeType;
  type:
    | ChannelTypes.ANNOUNCEMENT_THREAD
    | ChannelTypes.PUBLIC_THREAD
    | ChannelTypes.PRIVATE_THREAD;
  last_message_id?: SnowflakeType;
  flags: number;
  last_pin_timestamp?: string;
  guild_id: SnowflakeType;
  name: string;
  parent_id?: SnowflakeType;
  rate_limit_per_user?: number;
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string;
  video_quality_mode?: VideoQualityModes;
  permissions?: string;
  owner_id: SnowflakeType;
  thread_metadata?: ThreadMetadataResponse;
  message_count: number;
  member_count: number;
  total_message_sent: number;
  applied_tags?: SnowflakeType[];
  member?: ThreadMemberResponse;
}

export interface DefaultKeywordListTriggerMetadata {
  allow_list?: string[];
  presets?: AutomodKeywordPresetType[];
}

export interface DefaultKeywordListTriggerMetadataResponse {
  allow_list: string[];
  presets: AutomodKeywordPresetType[];
}

export interface DefaultKeywordListUpsertRequest {
  name: string;
  event_type: AutomodEventType;
  actions?: (
    | BlockMessageAction
    | FlagToChannelAction
    | QuarantineUserAction
    | UserCommunicationDisabledAction
  )[];
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_type: AutomodTriggerType.DEFAULT_KEYWORD_LIST;
  trigger_metadata: DefaultKeywordListTriggerMetadata;
}

export interface DefaultKeywordListUpsertRequestPartial {
  name?: string;
  event_type?: AutomodEventType;
  actions?: (
    | BlockMessageAction
    | FlagToChannelAction
    | QuarantineUserAction
    | UserCommunicationDisabledAction
  )[];
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_type?: AutomodTriggerType.DEFAULT_KEYWORD_LIST;
  trigger_metadata?: DefaultKeywordListTriggerMetadata;
}

export interface DefaultKeywordRuleResponse {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  creator_id: SnowflakeType;
  name: string;
  event_type: AutomodEventType;
  actions: (
    | BlockMessageActionResponse
    | FlagToChannelActionResponse
    | QuarantineUserActionResponse
    | UserCommunicationDisabledActionResponse
  )[];
  trigger_type: AutomodTriggerType.DEFAULT_KEYWORD_LIST;
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_metadata: DefaultKeywordListTriggerMetadataResponse;
}

export interface DefaultReactionEmojiResponse {
  emoji_id?: SnowflakeType;
  emoji_name?: string;
}

export interface DiscordIntegrationResponse {
  type: IntegrationTypes.DISCORD;
  name?: string;
  account?: AccountResponse;
  enabled?: boolean;
  id: SnowflakeType;
  application: IntegrationApplicationResponse;
  scopes: (
    | OAuth2Scopes.APPLICATIONS_COMMANDS
    | OAuth2Scopes.BOT
    | OAuth2Scopes.WEBHOOK_INCOMING
  )[];
  user?: UserResponse;
}

export interface EmbeddedActivityInstance {
  application_id: SnowflakeType;
  instance_id: string;
  launch_id: string;
  location?: GuildChannelLocation | PrivateChannelLocation;
  users: SnowflakeType[];
}

export interface Emoji {
  id?: SnowflakeType;
  name: string;
  animated?: boolean;
}

export interface EmojiResponse {
  id: SnowflakeType;
  name: string;
  user?: UserResponse;
  roles: SnowflakeType[];
  require_colons: boolean;
  managed: boolean;
  animated: boolean;
  available: boolean;
}

export enum EntitlementOwnerTypes {}

export interface EntitlementResponse {
  id: SnowflakeType;
  sku_id: SnowflakeType;
  application_id: SnowflakeType;
  user_id: SnowflakeType;
  guild_id?: SnowflakeType;
  deleted: boolean;
  starts_at?: string;
  ends_at?: string;
  type: EntitlementTypes;
  fulfilled_at?: string;
  fulfillment_status?: EntitlementTenantFulfillmentStatusResponse;
  consumed?: boolean;
}

export enum EntitlementTenantFulfillmentStatusResponse {
  UNKNOWN = 0,
  FULFILLMENT_NOT_NEEDED = 1,
  FULFILLMENT_NEEDED = 2,
  FULFILLED = 3,
  FULFILLMENT_FAILED = 4,
  UNFULFILLMENT_NEEDED = 5,
  UNFULFILLED = 6,
  UNFULFILLMENT_FAILED = 7,
}

export enum EntitlementTypes {
  APPLICATION_SUBSCRIPTION = 8,
  QUEST_REWARD = 10,
}

export interface EntityMetadataExternal {
  location: string;
}

export interface EntityMetadataExternalResponse {
  location: string;
}

export interface EntityMetadataStageInstance {}

export interface EntityMetadataStageInstanceResponse {}

export interface EntityMetadataVoice {}

export interface EntityMetadataVoiceResponse {}

export interface ExternalConnectionIntegrationResponse {
  type: IntegrationTypes.TWITCH | IntegrationTypes.YOUTUBE;
  name?: string;
  account?: AccountResponse;
  enabled?: boolean;
  id: string;
  user: UserResponse;
  revoked?: boolean;
  expire_behavior?: IntegrationExpireBehaviorTypes;
  expire_grace_period?: IntegrationExpireGracePeriodTypes;
  subscriber_count?: number;
  synced_at?: string;
  role_id?: SnowflakeType;
  syncing?: boolean;
  enable_emoticons?: boolean;
}

export interface ExternalScheduledEventCreateRequest {
  name: string;
  description?: string;
  image?: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  privacy_level: GuildScheduledEventPrivacyLevels;
  entity_type: GuildScheduledEventEntityTypes.EXTERNAL;
  channel_id?: SnowflakeType;
  entity_metadata: EntityMetadataExternal;
}

export interface ExternalScheduledEventPatchRequestPartial {
  status?: GuildScheduledEventStatuses;
  name?: string;
  description?: string;
  image?: string;
  scheduled_start_time?: string;
  scheduled_end_time?: string;
  entity_type?: GuildScheduledEventEntityTypes.EXTERNAL;
  privacy_level?: GuildScheduledEventPrivacyLevels;
  channel_id?: SnowflakeType;
  entity_metadata?: EntityMetadataExternal;
}

export interface ExternalScheduledEventResponse {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  name: string;
  description?: string;
  channel_id?: SnowflakeType;
  creator_id?: SnowflakeType;
  creator?: UserResponse;
  image?: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  status: GuildScheduledEventStatuses;
  entity_type: GuildScheduledEventEntityTypes.EXTERNAL;
  entity_id?: SnowflakeType;
  user_count?: number;
  privacy_level: GuildScheduledEventPrivacyLevels;
  user_rsvp?: ScheduledEventUserResponse;
  entity_metadata: EntityMetadataExternalResponse;
}

export interface FlagToChannelAction {
  type: AutomodActionType.FLAG_TO_CHANNEL;
  metadata: FlagToChannelActionMetadata;
}

export interface FlagToChannelActionMetadata {
  channel_id: SnowflakeType;
}

export interface FlagToChannelActionMetadataResponse {
  channel_id: SnowflakeType;
}

export interface FlagToChannelActionResponse {
  type: AutomodActionType.FLAG_TO_CHANNEL;
  metadata: FlagToChannelActionMetadataResponse;
}

export enum ForumLayout {
  /** No default has been set for forum channel */
  DEFAULT = 0,
  /** Display posts as a list */
  LIST = 1,
  /** Display posts as a collection of tiles */
  GRID = 2,
}

export interface ForumTagResponse {
  id: SnowflakeType;
  name: string;
  moderated: boolean;
  emoji_id?: SnowflakeType;
  emoji_name?: string;
}

export interface FriendInviteResponse {
  type?: InviteTypes.FRIEND;
  code: string;
  inviter?: UserResponse;
  max_age?: number;
  created_at?: string;
  expires_at?: string;
  friends_count?: number;
  channel?: InviteChannelResponse;
  is_contact?: boolean;
  uses?: number;
  max_uses?: number;
  flags?: number;
}

export interface GatewayBotResponse {
  url: string;
  session_start_limit: GatewayBotSessionStartLimitResponse;
  shards: number;
}

export interface GatewayBotSessionStartLimitResponse {
  max_concurrency: number;
  remaining: number;
  reset_after: number;
  total: number;
}

export interface GatewayResponse {
  url: string;
}

export interface GithubAuthor {
  username?: string;
  name: string;
}

export interface GithubCheckApp {
  name: string;
}

export interface GithubCheckPullRequest {
  number: number;
}

export interface GithubCheckRun {
  conclusion?: string;
  name: string;
  html_url: string;
  check_suite: GithubCheckSuite;
  details_url?: string;
  output?: GithubCheckRunOutput;
  pull_requests?: GithubCheckPullRequest[];
}

export interface GithubCheckRunOutput {
  title?: string;
  summary?: string;
}

export interface GithubCheckSuite {
  conclusion?: string;
  head_branch?: string;
  head_sha: string;
  pull_requests?: GithubCheckPullRequest[];
  app: GithubCheckApp;
}

export interface GithubComment {
  id: number;
  html_url: string;
  user: GithubUser;
  commit_id?: string;
  body: string;
}

export interface GithubCommit {
  id: string;
  url: string;
  message: string;
  author: GithubAuthor;
}

export interface GithubDiscussion {
  title: string;
  number: number;
  html_url: string;
  answer_html_url?: string;
  body?: string;
  user: GithubUser;
}

export interface GithubIssue {
  id: number;
  number: number;
  html_url: string;
  user: GithubUser;
  title: string;
  body?: string;
  pull_request?: any;
}

export interface GithubRelease {
  id: number;
  tag_name: string;
  html_url: string;
  author: GithubUser;
}

export interface GithubRepository {
  id: number;
  html_url: string;
  name: string;
  full_name: string;
}

export interface GithubReview {
  user: GithubUser;
  body?: string;
  html_url: string;
  state: string;
}

export interface GithubUser {
  id: number;
  login: string;
  html_url: string;
  avatar_url: string;
}

export interface GithubWebhook {
  action?: string;
  ref?: string;
  ref_type?: string;
  comment?: GithubComment;
  issue?: GithubIssue;
  pull_request?: GithubIssue;
  repository?: GithubRepository;
  forkee?: GithubRepository;
  sender: GithubUser;
  member?: GithubUser;
  release?: GithubRelease;
  head_commit?: GithubCommit;
  commits?: GithubCommit[];
  forced?: boolean;
  compare?: string;
  review?: GithubReview;
  check_run?: GithubCheckRun;
  check_suite?: GithubCheckSuite;
  discussion?: GithubDiscussion;
  answer?: GithubComment;
}

export interface GroupDMInviteResponse {
  type?: InviteTypes.GROUP_DM;
  code: string;
  inviter?: UserResponse;
  max_age?: number;
  created_at?: string;
  expires_at?: string;
  channel?: InviteChannelResponse;
  approximate_member_count?: number;
}

export interface GuildAuditLogResponse {
  audit_log_entries: AuditLogEntryResponse[];
  users: UserResponse[];
  integrations: (
    | PartialDiscordIntegrationResponse
    | PartialExternalConnectionIntegrationResponse
    | PartialGuildSubscriptionIntegrationResponse
  )[];
  webhooks: (
    | ApplicationIncomingWebhookResponse
    | ChannelFollowerWebhookResponse
    | GuildIncomingWebhookResponse
  )[];
  guild_scheduled_events: (
    | ExternalScheduledEventResponse
    | StageScheduledEventResponse
    | VoiceScheduledEventResponse
  )[];
  threads: ThreadResponse[];
  application_commands: ApplicationCommandResponse[];
  auto_moderation_rules: (
    | DefaultKeywordRuleResponse
    | KeywordRuleResponse
    | MLSpamRuleResponse
    | MentionSpamRuleResponse
    | SpamLinkRuleResponse
    | null
  )[];
}

export interface GuildBanResponse {
  user: UserResponse;
  reason?: string;
}

export interface GuildChannelLocation {
  id: string;
  kind: ActivityLocationKinds.GUILD_CHANNEL;
  channel_id: SnowflakeType;
  guild_id: SnowflakeType;
}

export interface GuildChannelResponse {
  id: SnowflakeType;
  type:
    | ChannelTypes.GUILD_TEXT
    | ChannelTypes.GUILD_VOICE
    | ChannelTypes.GUILD_CATEGORY
    | ChannelTypes.GUILD_ANNOUNCEMENT
    | ChannelTypes.GUILD_STAGE_VOICE
    | ChannelTypes.GUILD_DIRECTORY
    | ChannelTypes.GUILD_FORUM;
  last_message_id?: SnowflakeType;
  flags: number;
  last_pin_timestamp?: string;
  guild_id: SnowflakeType;
  name: string;
  parent_id?: SnowflakeType;
  rate_limit_per_user?: number;
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string;
  video_quality_mode?: VideoQualityModes;
  permissions?: string;
  topic?: string;
  default_auto_archive_duration?: ThreadAutoArchiveDuration;
  default_thread_rate_limit_per_user?: number;
  position: number;
  permission_overwrites?: ChannelPermissionOverwriteResponse[];
  nsfw?: boolean;
  available_tags?: ForumTagResponse[];
  default_reaction_emoji?: DefaultReactionEmojiResponse;
  default_sort_order?: ThreadSortOrder;
  default_forum_layout?: ForumLayout;
}

export interface GuildCreateRequest {
  description?: string;
  name: string;
  region?: string;
  icon?: string;
  verification_level?: VerificationLevels;
  default_message_notifications?: UserNotificationSettings;
  explicit_content_filter?: GuildExplicitContentFilterTypes;
  preferred_locale?: AvailableLocalesEnum;
  afk_timeout?: AfkTimeouts;
  roles?: CreateGuildRequestRoleItem[];
  channels?: CreateGuildRequestChannelItem[];
  afk_channel_id?: SnowflakeType;
  system_channel_id?: SnowflakeType;
  system_channel_flags?: number;
}

export enum GuildExplicitContentFilterTypes {
  /** media content will not be scanned */
  DISABLED = 0,
  /** media content sent by members without roles will be scanned */
  MEMBERS_WITHOUT_ROLES = 1,
  /** media content sent by all members will be scanned */
  ALL_MEMBERS = 2,
}

export enum GuildFeatures {
  /** guild has access to set an animated guild banner image */
  ANIMATED_BANNER = "ANIMATED_BANNER",
  /** guild has access to set an animated guild icon */
  ANIMATED_ICON = "ANIMATED_ICON",
  /** guild is using the old permissions configuration behavior */
  APPLICATION_COMMAND_PERMISSIONS_V2 = "APPLICATION_COMMAND_PERMISSIONS_V2",
  /** guild has set up auto moderation rules */
  AUTO_MODERATION = "AUTO_MODERATION",
  /** guild has access to set a guild banner image */
  BANNER = "BANNER",
  /** guild can enable welcome screen, Membership Screening, stage channels and discovery, and             receives community updates */
  COMMUNITY = "COMMUNITY",
  /** guild has enabled monetization */
  CREATOR_MONETIZABLE_PROVISIONAL = "CREATOR_MONETIZABLE_PROVISIONAL",
  /** guild has enabled the role subscription promo page */
  CREATOR_STORE_PAGE = "CREATOR_STORE_PAGE",
  /** guild has been set as a support server on the App Directory */
  DEVELOPER_SUPPORT_SERVER = "DEVELOPER_SUPPORT_SERVER",
  /** guild is able to be discovered in the directory */
  DISCOVERABLE = "DISCOVERABLE",
  /** guild is able to be featured in the directory */
  FEATURABLE = "FEATURABLE",
  /** guild has paused invites, preventing new users from joining */
  INVITES_DISABLED = "INVITES_DISABLED",
  /** guild has access to set an invite splash background */
  INVITE_SPLASH = "INVITE_SPLASH",
  /** guild has enabled Membership Screening */
  MEMBER_VERIFICATION_GATE_ENABLED = "MEMBER_VERIFICATION_GATE_ENABLED",
  /** guild has increased custom sticker slots */
  MORE_STICKERS = "MORE_STICKERS",
  /** guild has access to create announcement channels */
  NEWS = "NEWS",
  /** guild is partnered */
  PARTNERED = "PARTNERED",
  /** guild can be previewed before joining via Membership Screening or the directory */
  PREVIEW_ENABLED = "PREVIEW_ENABLED",
  /** guild has disabled activity alerts in the configured safety alerts channel */
  RAID_ALERTS_DISABLED = "RAID_ALERTS_DISABLED",
  /** guild is able to set role icons */
  ROLE_ICONS = "ROLE_ICONS",
  /** guild has role subscriptions that can be purchased */
  ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE = "ROLE_SUBSCRIPTIONS_AVAILABLE_FOR_PURCHASE",
  /** guild has enabled role subscriptions */
  ROLE_SUBSCRIPTIONS_ENABLED = "ROLE_SUBSCRIPTIONS_ENABLED",
  /** guild has enabled ticketed events */
  TICKETED_EVENTS_ENABLED = "TICKETED_EVENTS_ENABLED",
  /** guild has access to set a vanity URL */
  VANITY_URL = "VANITY_URL",
  /** guild is verified */
  VERIFIED = "VERIFIED",
  /** guild has access to set 384kbps bitrate in voice (previously VIP voice servers) */
  VIP_REGIONS = "VIP_REGIONS",
  /** guild has enabled the welcome screen */
  WELCOME_SCREEN_ENABLED = "WELCOME_SCREEN_ENABLED",
}

export interface GuildHomeSettingsResponse {
  guild_id: SnowflakeType;
  enabled: boolean;
  welcome_message?: WelcomeMessageResponse;
  new_member_actions?: (null | NewMemberActionResponse)[];
  resource_channels?: (null | ResourceChannelResponse)[];
}

export interface GuildIncomingWebhookResponse {
  application_id?: SnowflakeType;
  avatar?: string;
  channel_id?: SnowflakeType;
  guild_id?: SnowflakeType;
  id: SnowflakeType;
  name: string;
  type: WebhookTypes.GUILD_INCOMING;
  user?: UserResponse;
  token?: string;
  url?: string;
}

export interface GuildInviteResponse {
  type?: InviteTypes.GUILD;
  code: string;
  inviter?: UserResponse;
  max_age?: number;
  created_at?: string;
  expires_at?: string;
  is_contact?: boolean;
  flags?: number;
  guild?: InviteGuildResponse;
  guild_id?: SnowflakeType;
  channel?: InviteChannelResponse;
  stage_instance?: InviteStageInstanceResponse;
  target_type?: InviteTargetTypes;
  target_user?: UserResponse;
  target_application?: InviteApplicationResponse;
  guild_scheduled_event?: ScheduledEventResponse;
  uses?: number;
  max_uses?: number;
  temporary?: boolean;
  approximate_member_count?: number;
  approximate_presence_count?: number;
}

export enum GuildMFALevel {
  /** Guild has no MFA/2FA requirement for moderation actions */
  NONE = 0,
  /** Guild has a 2FA requirement for moderation actions */
  ELEVATED = 1,
}

export interface GuildMFALevelResponse {
  level: GuildMFALevel;
}

export interface GuildMemberResponse {
  avatar?: string;
  avatar_decoration_data?: UserAvatarDecorationResponse;
  banner?: string;
  communication_disabled_until?: string;
  flags: number;
  joined_at: string;
  nick?: string;
  pending: boolean;
  premium_since?: string;
  roles: SnowflakeType[];
  user: UserResponse;
  mute: boolean;
  deaf: boolean;
}

export enum GuildNSFWContentLevel {
  DEFAULT = 0,
  EXPLICIT = 1,
  SAFE = 2,
  AGE_RESTRICTED = 3,
}

export enum GuildOnboardingMode {
  /** Only Default Channels considered in constraints */
  ONBOARDING_DEFAULT = 0,
  /** Default Channels and Onboarding Prompts considered in constraints */
  ONBOARDING_ADVANCED = 1,
}

export interface GuildOnboardingResponse {
  guild_id: SnowflakeType;
  prompts: OnboardingPromptResponse[];
  default_channel_ids: SnowflakeType[];
  enabled: boolean;
}

export interface GuildPatchRequestPartial {
  name?: string;
  description?: string;
  region?: string;
  icon?: string;
  verification_level?: VerificationLevels;
  default_message_notifications?: UserNotificationSettings;
  explicit_content_filter?: GuildExplicitContentFilterTypes;
  preferred_locale?: AvailableLocalesEnum;
  afk_timeout?: AfkTimeouts;
  afk_channel_id?: SnowflakeType;
  system_channel_id?: SnowflakeType;
  owner_id?: SnowflakeType;
  splash?: string;
  banner?: string;
  system_channel_flags?: number;
  features?: (string | null)[];
  discovery_splash?: string;
  home_header?: string;
  rules_channel_id?: SnowflakeType;
  safety_alerts_channel_id?: SnowflakeType;
  public_updates_channel_id?: SnowflakeType;
  premium_progress_bar_enabled?: boolean;
}

export interface GuildPreviewResponse {
  id: SnowflakeType;
  name: string;
  icon?: string;
  description?: string;
  home_header?: string;
  splash?: string;
  discovery_splash?: string;
  features: GuildFeatures[];
  approximate_member_count: number;
  approximate_presence_count: number;
  emojis: EmojiResponse[];
  stickers: GuildStickerResponse[];
}

export interface GuildProductPurchaseResponse {
  listing_id: SnowflakeType;
  product_name: string;
}

export interface GuildPruneResponse {
  pruned?: number;
}

export interface GuildResponse {
  id: SnowflakeType;
  name: string;
  icon?: string;
  description?: string;
  home_header?: string;
  splash?: string;
  discovery_splash?: string;
  features: GuildFeatures[];
  banner?: string;
  owner_id: SnowflakeType;
  application_id?: SnowflakeType;
  region: string;
  afk_channel_id?: SnowflakeType;
  afk_timeout: AfkTimeouts;
  system_channel_id?: SnowflakeType;
  system_channel_flags: number;
  widget_enabled: boolean;
  widget_channel_id?: SnowflakeType;
  verification_level: VerificationLevels;
  roles: GuildRoleResponse[];
  default_message_notifications: UserNotificationSettings;
  mfa_level: GuildMFALevel;
  explicit_content_filter: GuildExplicitContentFilterTypes;
  max_presences?: number;
  max_members?: number;
  max_stage_video_channel_users?: number;
  max_video_channel_users?: number;
  vanity_url_code?: string;
  premium_tier: PremiumGuildTiers;
  premium_subscription_count: number;
  preferred_locale: AvailableLocalesEnum;
  rules_channel_id?: SnowflakeType;
  safety_alerts_channel_id?: SnowflakeType;
  public_updates_channel_id?: SnowflakeType;
  premium_progress_bar_enabled: boolean;
  nsfw: boolean;
  nsfw_level: GuildNSFWContentLevel;
  emojis: EmojiResponse[];
  stickers: GuildStickerResponse[];
}

export interface GuildRoleResponse {
  id: SnowflakeType;
  name: string;
  description?: string;
  permissions: string;
  position: number;
  color: number;
  hoist: boolean;
  managed: boolean;
  mentionable: boolean;
  icon?: string;
  unicode_emoji?: string;
  tags?: GuildRoleTagsResponse;
}

export interface GuildRoleTagsResponse {
  premium_subscriber?: null;
  bot_id?: SnowflakeType;
  integration_id?: SnowflakeType;
  subscription_listing_id?: SnowflakeType;
  available_for_purchase?: null;
  guild_connections?: null;
}

export enum GuildScheduledEventEntityTypes {
  NONE = 0,
  STAGE_INSTANCE = 1,
  VOICE = 2,
  EXTERNAL = 3,
}

export enum GuildScheduledEventPrivacyLevels {
  /** the scheduled event is only accessible to guild members */
  GUILD_ONLY = 2,
}

export enum GuildScheduledEventStatuses {
  SCHEDULED = 1,
  ACTIVE = 2,
  COMPLETED = 3,
  CANCELED = 4,
}

export interface GuildStickerResponse {
  id: SnowflakeType;
  name: string;
  tags: string;
  type: StickerTypes.GUILD;
  format_type?: StickerFormatTypes;
  description?: string;
  available: boolean;
  guild_id: SnowflakeType;
  user?: UserResponse;
}

export interface GuildSubscriptionIntegrationResponse {
  type: IntegrationTypes.GUILD_SUBSCRIPTION;
  name?: string;
  account?: AccountResponse;
  enabled?: boolean;
  id: SnowflakeType;
}

export interface GuildTemplateChannelResponse {
  id?: number;
  type:
    | ChannelTypes.GUILD_TEXT
    | ChannelTypes.GUILD_VOICE
    | ChannelTypes.GUILD_CATEGORY;
  name?: string;
  position?: number;
  topic?: string;
  bitrate: number;
  user_limit: number;
  nsfw: boolean;
  rate_limit_per_user: number;
  parent_id?: SnowflakeType;
  default_auto_archive_duration?: ThreadAutoArchiveDuration;
  permission_overwrites: (null | ChannelPermissionOverwriteResponse)[];
  available_tags?: GuildTemplateChannelTags[];
  template: string;
  default_reaction_emoji?: DefaultReactionEmojiResponse;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: ThreadSortOrder;
  default_forum_layout?: ForumLayout;
  icon_emoji?: IconEmojiResponse;
  theme_color?: number;
}

export interface GuildTemplateChannelTags {
  name: string;
  emoji_id?: SnowflakeType;
  emoji_name?: string;
  moderated?: boolean;
}

export interface GuildTemplateResponse {
  code: string;
  name: string;
  description?: string;
  usage_count: number;
  creator_id: SnowflakeType;
  creator?: UserResponse;
  created_at: string;
  updated_at: string;
  source_guild_id: SnowflakeType;
  serialized_source_guild: GuildTemplateSnapshotResponse;
  is_dirty?: boolean;
}

export interface GuildTemplateRoleResponse {
  id: number;
  name: string;
  permissions: string;
  color: number;
  hoist: boolean;
  mentionable: boolean;
  icon?: string;
  unicode_emoji?: string;
}

export interface GuildTemplateSnapshotResponse {
  name: string;
  description?: string;
  region?: string;
  verification_level: VerificationLevels;
  default_message_notifications: UserNotificationSettings;
  explicit_content_filter: GuildExplicitContentFilterTypes;
  preferred_locale: AvailableLocalesEnum;
  afk_channel_id?: SnowflakeType;
  afk_timeout: AfkTimeouts;
  system_channel_id?: SnowflakeType;
  system_channel_flags: number;
  roles: GuildTemplateRoleResponse[];
  channels: GuildTemplateChannelResponse[];
}

export interface GuildWelcomeChannel {
  channel_id: SnowflakeType;
  description: string;
  emoji_id?: SnowflakeType;
  emoji_name?: string;
}

export interface GuildWelcomeScreenChannelResponse {
  channel_id: SnowflakeType;
  description: string;
  emoji_id?: SnowflakeType;
  emoji_name?: string;
}

export interface GuildWelcomeScreenResponse {
  description?: string;
  welcome_channels: GuildWelcomeScreenChannelResponse[];
}

export interface GuildWithCountsResponse {
  id: SnowflakeType;
  name: string;
  icon?: string;
  description?: string;
  home_header?: string;
  splash?: string;
  discovery_splash?: string;
  features: GuildFeatures[];
  banner?: string;
  owner_id: SnowflakeType;
  application_id?: SnowflakeType;
  region: string;
  afk_channel_id?: SnowflakeType;
  afk_timeout: AfkTimeouts;
  system_channel_id?: SnowflakeType;
  system_channel_flags: number;
  widget_enabled: boolean;
  widget_channel_id?: SnowflakeType;
  verification_level: VerificationLevels;
  roles: GuildRoleResponse[];
  default_message_notifications: UserNotificationSettings;
  mfa_level: GuildMFALevel;
  explicit_content_filter: GuildExplicitContentFilterTypes;
  max_presences?: number;
  max_members?: number;
  max_stage_video_channel_users?: number;
  max_video_channel_users?: number;
  vanity_url_code?: string;
  premium_tier: PremiumGuildTiers;
  premium_subscription_count: number;
  preferred_locale: AvailableLocalesEnum;
  rules_channel_id?: SnowflakeType;
  safety_alerts_channel_id?: SnowflakeType;
  public_updates_channel_id?: SnowflakeType;
  premium_progress_bar_enabled: boolean;
  nsfw: boolean;
  nsfw_level: GuildNSFWContentLevel;
  emojis: EmojiResponse[];
  stickers: GuildStickerResponse[];
  approximate_member_count?: number;
  approximate_presence_count?: number;
}

export interface IconEmojiResponse {}

export interface IncomingWebhookInteractionRequest {
  content?: string;
  embeds?: RichEmbed[];
  allowed_mentions?: MessageAllowedMentionsRequest;
  components?: ActionRow[];
  attachments?: MessageAttachmentRequest[];
  poll?: PollCreateRequest;
  tts?: boolean;
  flags?: number;
}

export interface IncomingWebhookRequestPartial {
  content?: string;
  embeds?: RichEmbed[];
  allowed_mentions?: MessageAllowedMentionsRequest;
  components?: ActionRow[];
  attachments?: MessageAttachmentRequest[];
  poll?: PollCreateRequest;
  tts?: boolean;
  flags?: number;
  username?: string;
  avatar_url?: string;
  thread_name?: string;
  applied_tags?: SnowflakeType[];
}

export interface IncomingWebhookUpdateForInteractionCallbackRequestPartial {
  content?: string;
  embeds?: RichEmbed[];
  allowed_mentions?: MessageAllowedMentionsRequest;
  components?: ActionRow[];
  attachments?: MessageAttachmentRequest[];
  flags?: number;
}

export interface IncomingWebhookUpdateRequestPartial {
  content?: string;
  embeds?: RichEmbed[];
  allowed_mentions?: MessageAllowedMentionsRequest;
  components?: ActionRow[];
  attachments?: MessageAttachmentRequest[];
  poll?: PollCreateRequest;
  flags?: number;
}

export interface InputText {
  type: MessageComponentTypes.INPUT_TEXT;
  custom_id: string;
  style: TextStyleTypes;
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  min_length?: number;
  max_length?: number;
}

export interface IntegrationApplicationResponse {
  id: SnowflakeType;
  name: string;
  icon?: string;
  description: string;
  type?: ApplicationTypes;
  cover_image?: string;
  primary_sku_id?: SnowflakeType;
  bot?: UserResponse;
}

export enum IntegrationExpireBehaviorTypes {
  /** Remove role */
  REMOVE_ROLE = 0,
  /** Kick */
  KICK = 1,
}

export enum IntegrationExpireGracePeriodTypes {
  /** 1 day */
  ONE_DAY = 1,
  /** 3 days */
  THREE_DAYS = 3,
  /** 7 days */
  SEVEN_DAYS = 7,
  /** 14 days */
  FOURTEEN_DAYS = 14,
  /** 30 days */
  THIRTY_DAYS = 30,
}

export enum IntegrationTypes {
  DISCORD = "discord",
  TWITCH = "twitch",
  YOUTUBE = "youtube",
  GUILD_SUBSCRIPTION = "guild_subscription",
}

export interface InteractionApplicationCommandAutocompleteCallbackIntegerData {
  choices?: (null | ApplicationCommandOptionIntegerChoice)[];
}

export interface InteractionApplicationCommandAutocompleteCallbackNumberData {
  choices?: (null | ApplicationCommandOptionNumberChoice)[];
}

export interface InteractionApplicationCommandAutocompleteCallbackStringData {
  choices?: (null | ApplicationCommandOptionStringChoice)[];
}

export interface InteractionCallbackResponse {
  interaction: InteractionResponse;
  resource?:
    | CreateMessageInteractionCallbackResponse
    | LaunchActivityInteractionCallbackResponse
    | UpdateMessageInteractionCallbackResponse;
}

export enum InteractionCallbackTypes {
  PONG = 1,
  CHANNEL_MESSAGE_WITH_SOURCE = 4,
  DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE = 5,
  DEFERRED_UPDATE_MESSAGE = 6,
  UPDATE_MESSAGE = 7,
  APPLICATION_COMMAND_AUTOCOMPLETE_RESULT = 8,
  MODAL = 9,
  LAUNCH_ACTIVITY = 12,
}

export enum InteractionContextType {}

export interface InteractionResponse {
  id: SnowflakeType;
  type: InteractionTypes;
  response_message_id?: SnowflakeType;
  response_message_loading?: boolean;
  response_message_ephemeral?: boolean;
  channel_id?: SnowflakeType;
  guild_id?: SnowflakeType;
}

export enum InteractionTypes {
  /** Sent by Discord to validate your application's interaction handler */
  PING = 1,
  /** Sent when a user uses an application command */
  APPLICATION_COMMAND = 2,
  /** Sent when a user interacts with a message component previously sent by your application */
  MESSAGE_COMPONENT = 3,
  /** Sent when a user is filling in an autocomplete option in a chat command */
  APPLICATION_COMMAND_AUTOCOMPLETE = 4,
  /** Sent when a user submits a modal previously sent by your application */
  MODAL_SUBMIT = 5,
}

export interface InviteApplicationResponse {
  id: SnowflakeType;
  name: string;
  icon?: string;
  description: string;
  type?: ApplicationTypes;
  cover_image?: string;
  primary_sku_id?: SnowflakeType;
  bot?: UserResponse;
  slug?: string;
  guild_id?: SnowflakeType;
  rpc_origins?: (string | null)[];
  bot_public?: boolean;
  bot_require_code_grant?: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  custom_install_url?: string;
  install_params?: ApplicationOAuth2InstallParamsResponse;
  integration_types_config?: {
    [index: string]: ApplicationIntegrationTypeConfigurationResponse;
  };
  verify_key: string;
  flags: number;
  max_participants?: number;
  tags?: string[];
}

export interface InviteChannelRecipientResponse {
  username: string;
}

export interface InviteChannelResponse {
  id: SnowflakeType;
  type: ChannelTypes;
  name?: string;
  icon?: string;
  recipients?: InviteChannelRecipientResponse[];
}

export interface InviteGuildResponse {
  id: SnowflakeType;
  name: string;
  splash?: string;
  banner?: string;
  description?: string;
  icon?: string;
  features: GuildFeatures[];
  verification_level?: VerificationLevels;
  vanity_url_code?: string;
  nsfw_level?: GuildNSFWContentLevel;
  nsfw?: boolean;
  premium_subscription_count?: number;
}

export interface InviteStageInstanceResponse {
  topic: string;
  participant_count?: number;
  speaker_count?: number;
  members?: GuildMemberResponse[];
}

export enum InviteTargetTypes {
  STREAM = 1,
  EMBEDDED_APPLICATION = 2,
  ROLE_SUBSCRIPTIONS_PURCHASE = 3,
}

export enum InviteTypes {
  GUILD = 0,
  GROUP_DM = 1,
  FRIEND = 2,
}

export interface KeywordRuleResponse {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  creator_id: SnowflakeType;
  name: string;
  event_type: AutomodEventType;
  actions: (
    | BlockMessageActionResponse
    | FlagToChannelActionResponse
    | QuarantineUserActionResponse
    | UserCommunicationDisabledActionResponse
  )[];
  trigger_type: AutomodTriggerType.KEYWORD;
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_metadata: KeywordTriggerMetadataResponse;
}

export interface KeywordTriggerMetadata {
  keyword_filter?: string[];
  regex_patterns?: string[];
  allow_list?: string[];
}

export interface KeywordTriggerMetadataResponse {
  keyword_filter: string[];
  regex_patterns: string[];
  allow_list: string[];
}

export interface KeywordUpsertRequest {
  name: string;
  event_type: AutomodEventType;
  actions?: (
    | BlockMessageAction
    | FlagToChannelAction
    | QuarantineUserAction
    | UserCommunicationDisabledAction
  )[];
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_type: AutomodTriggerType.KEYWORD;
  trigger_metadata?: KeywordTriggerMetadata;
}

export interface KeywordUpsertRequestPartial {
  name?: string;
  event_type?: AutomodEventType;
  actions?: (
    | BlockMessageAction
    | FlagToChannelAction
    | QuarantineUserAction
    | UserCommunicationDisabledAction
  )[];
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_type?: AutomodTriggerType.KEYWORD;
  trigger_metadata?: KeywordTriggerMetadata;
}

export interface LaunchActivityInteractionCallbackRequest {
  type: InteractionCallbackTypes.LAUNCH_ACTIVITY;
}

export interface LaunchActivityInteractionCallbackResponse {
  type: InteractionCallbackTypes.LAUNCH_ACTIVITY;
}

export interface ListApplicationEmojisResponse {
  items: EmojiResponse[];
}

export interface ListGuildSoundboardSoundsResponse {
  items: SoundboardSoundResponse[];
}

export interface MLSpamRuleResponse {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  creator_id: SnowflakeType;
  name: string;
  event_type: AutomodEventType;
  actions: (
    | BlockMessageActionResponse
    | FlagToChannelActionResponse
    | QuarantineUserActionResponse
    | UserCommunicationDisabledActionResponse
  )[];
  trigger_type: AutomodTriggerType.ML_SPAM;
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_metadata: MLSpamTriggerMetadataResponse;
}

export interface MLSpamTriggerMetadata {}

export interface MLSpamTriggerMetadataResponse {}

export interface MLSpamUpsertRequest {
  name: string;
  event_type: AutomodEventType;
  actions?: (
    | BlockMessageAction
    | FlagToChannelAction
    | QuarantineUserAction
    | UserCommunicationDisabledAction
  )[];
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_type: AutomodTriggerType.ML_SPAM;
  trigger_metadata?: MLSpamTriggerMetadata;
}

export interface MLSpamUpsertRequestPartial {
  name?: string;
  event_type?: AutomodEventType;
  actions?: (
    | BlockMessageAction
    | FlagToChannelAction
    | QuarantineUserAction
    | UserCommunicationDisabledAction
  )[];
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_type?: AutomodTriggerType.ML_SPAM;
  trigger_metadata?: MLSpamTriggerMetadata;
}

export interface MentionSpamRuleResponse {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  creator_id: SnowflakeType;
  name: string;
  event_type: AutomodEventType;
  actions: (
    | BlockMessageActionResponse
    | FlagToChannelActionResponse
    | QuarantineUserActionResponse
    | UserCommunicationDisabledActionResponse
  )[];
  trigger_type: AutomodTriggerType.MENTION_SPAM;
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_metadata: MentionSpamTriggerMetadataResponse;
}

export interface MentionSpamTriggerMetadata {
  mention_total_limit: number;
  mention_raid_protection_enabled?: boolean;
}

export interface MentionSpamTriggerMetadataResponse {
  mention_total_limit: number;
  mention_raid_protection_enabled?: boolean;
}

export interface MentionSpamUpsertRequest {
  name: string;
  event_type: AutomodEventType;
  actions?: (
    | BlockMessageAction
    | FlagToChannelAction
    | QuarantineUserAction
    | UserCommunicationDisabledAction
  )[];
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_type: AutomodTriggerType.MENTION_SPAM;
  trigger_metadata?: MentionSpamTriggerMetadata;
}

export interface MentionSpamUpsertRequestPartial {
  name?: string;
  event_type?: AutomodEventType;
  actions?: (
    | BlockMessageAction
    | FlagToChannelAction
    | QuarantineUserAction
    | UserCommunicationDisabledAction
  )[];
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_type?: AutomodTriggerType.MENTION_SPAM;
  trigger_metadata?: MentionSpamTriggerMetadata;
}

export interface MentionableSelect {
  type: MessageComponentTypes.MENTIONABLE_SELECT;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  default_values?: (RoleSelectDefaultValue | UserSelectDefaultValue)[];
}

export interface MessageActivityResponse {}

export interface MessageAllowedMentionsRequest {
  parse?: (null | AllowedMentionTypes)[];
  users?: (null | SnowflakeType)[];
  roles?: (null | SnowflakeType)[];
  replied_user?: boolean;
}

export interface MessageAttachmentRequest {
  id: SnowflakeType;
  filename?: string;
  description?: string;
  duration_secs?: number;
  waveform?: string;
  title?: string;
  is_remix?: boolean;
}

export interface MessageAttachmentResponse {
  id: SnowflakeType;
  filename: string;
  size: number;
  url: string;
  proxy_url: string;
  width?: number;
  height?: number;
  duration_secs?: number;
  waveform?: string;
  description?: string;
  content_type?: string;
  ephemeral?: boolean;
  title?: string;
  application?: ApplicationResponse;
  clip_created_at?: string;
  clip_participants?: UserResponse[];
}

export interface MessageCallResponse {
  ended_timestamp?: string;
  participants: SnowflakeType[];
}

export interface MessageComponentActionRowResponse {
  type: MessageComponentTypes.ACTION_ROW;
  id: number;
  components?: (
    | MessageComponentButtonResponse
    | MessageComponentChannelSelectResponse
    | MessageComponentInputTextResponse
    | MessageComponentMentionableSelectResponse
    | MessageComponentRoleSelectResponse
    | MessageComponentStringSelectResponse
    | MessageComponentUserSelectResponse
  )[];
}

export interface MessageComponentButtonResponse {
  type: MessageComponentTypes.BUTTON;
  id: number;
  custom_id?: string;
  style: ButtonStyleTypes;
  label?: string;
  disabled?: boolean;
  emoji?: MessageComponentEmojiResponse;
  url?: string;
  sku_id?: SnowflakeType;
}

export interface MessageComponentChannelSelectResponse {
  type: MessageComponentTypes.CHANNEL_SELECT;
  id: number;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  channel_types?: ChannelTypes[];
  default_values?: ChannelSelectDefaultValueResponse[];
}

export interface MessageComponentEmojiResponse {
  id?: SnowflakeType;
  name: string;
  animated?: boolean;
}

export interface MessageComponentInputTextResponse {
  type: MessageComponentTypes.INPUT_TEXT;
  id: number;
  custom_id: string;
  style: TextStyleTypes;
  label?: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  min_length?: number;
  max_length?: number;
}

export interface MessageComponentInteractionMetadataResponse {
  id: SnowflakeType;
  type: InteractionTypes.MESSAGE_COMPONENT;
  user?: UserResponse;
  authorizing_integration_owners: {
    [index: string]: SnowflakeType;
  };
  original_response_message_id?: SnowflakeType;
  interacted_message_id: SnowflakeType;
}

export interface MessageComponentMentionableSelectResponse {
  type: MessageComponentTypes.MENTIONABLE_SELECT;
  id: number;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  default_values?: (
    | RoleSelectDefaultValueResponse
    | UserSelectDefaultValueResponse
  )[];
}

export interface MessageComponentRoleSelectResponse {
  type: MessageComponentTypes.ROLE_SELECT;
  id: number;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  default_values?: RoleSelectDefaultValueResponse[];
}

export interface MessageComponentStringSelectResponse {
  type: MessageComponentTypes.STRING_SELECT;
  id: number;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  options?: (null | SelectOptionResponse)[];
}

export enum MessageComponentTypes {
  /** Container for other components */
  ACTION_ROW = 1,
  /** Button object */
  BUTTON = 2,
  /** Select menu for picking from defined text options */
  STRING_SELECT = 3,
  /** Text input object */
  INPUT_TEXT = 4,
  /** Select menu for users */
  USER_SELECT = 5,
  /** Select menu for roles */
  ROLE_SELECT = 6,
  /** Select menu for mentionables (users and roles) */
  MENTIONABLE_SELECT = 7,
  /** Select menu for channels */
  CHANNEL_SELECT = 8,
}

export interface MessageComponentUserSelectResponse {
  type: MessageComponentTypes.USER_SELECT;
  id: number;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  default_values?: UserSelectDefaultValueResponse[];
}

export interface MessageCreateRequest {
  content?: string;
  embeds?: RichEmbed[];
  allowed_mentions?: MessageAllowedMentionsRequest;
  sticker_ids?: SnowflakeType[];
  components?: ActionRow[];
  flags?: number;
  attachments?: MessageAttachmentRequest[];
  poll?: PollCreateRequest;
  message_reference?: MessageReferenceRequest;
  nonce?: number | string;
  enforce_nonce?: boolean;
  tts?: boolean;
}

export interface MessageEditRequestPartial {
  content?: string;
  embeds?: RichEmbed[];
  flags?: number;
  allowed_mentions?: MessageAllowedMentionsRequest;
  sticker_ids?: SnowflakeType[];
  components?: ActionRow[];
  attachments?: MessageAttachmentRequest[];
}

export interface MessageEmbedAuthorResponse {
  name: string;
  url?: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface MessageEmbedFieldResponse {
  name: string;
  value: string;
  inline: boolean;
}

export interface MessageEmbedFooterResponse {
  text: string;
  icon_url?: string;
  proxy_icon_url?: string;
}

export interface MessageEmbedImageResponse {
  url?: string;
  proxy_url?: string;
  width?: UInt32Type;
  height?: UInt32Type;
  placeholder?: string;
  placeholder_version?: UInt32Type;
}

export interface MessageEmbedProviderResponse {
  name: string;
  url?: string;
}

export interface MessageEmbedResponse {
  type: string;
  url?: string;
  title?: string;
  description?: string;
  color?: number;
  timestamp?: string;
  fields?: MessageEmbedFieldResponse[];
  author?: MessageEmbedAuthorResponse;
  provider?: MessageEmbedProviderResponse;
  image?: MessageEmbedImageResponse;
  thumbnail?: MessageEmbedImageResponse;
  video?: MessageEmbedVideoResponse;
  footer?: MessageEmbedFooterResponse;
}

export interface MessageEmbedVideoResponse {
  url?: string;
  proxy_url?: string;
  width?: UInt32Type;
  height?: UInt32Type;
  placeholder?: string;
  placeholder_version?: UInt32Type;
}

export interface MessageInteractionResponse {
  id: SnowflakeType;
  type: InteractionTypes;
  name: string;
  user?: UserResponse;
  name_localized?: string;
}

export interface MessageMentionChannelResponse {
  id: SnowflakeType;
  name: string;
  type: ChannelTypes;
  guild_id: SnowflakeType;
}

export interface MessageReactionCountDetailsResponse {
  burst: number;
  normal: number;
}

export interface MessageReactionEmojiResponse {
  id?: SnowflakeType;
  name?: string;
  animated?: boolean;
}

export interface MessageReactionResponse {
  emoji: MessageReactionEmojiResponse;
  count: number;
  count_details: MessageReactionCountDetailsResponse;
  burst_colors: string[];
  me_burst: boolean;
  me: boolean;
}

export interface MessageReferenceRequest {
  guild_id?: SnowflakeType;
  channel_id?: SnowflakeType;
  message_id: SnowflakeType;
  fail_if_not_exists?: boolean;
  type?: MessageReferenceType;
}

export interface MessageReferenceResponse {
  type?: MessageReferenceType;
  channel_id: SnowflakeType;
  message_id?: SnowflakeType;
  guild_id?: SnowflakeType;
}

export enum MessageReferenceType {
  /** Reference to a message */
  DEFAULT = 0,
}

export interface MessageResponse {
  type: MessageType;
  content: string;
  mentions: UserResponse[];
  mention_roles: SnowflakeType[];
  attachments: MessageAttachmentResponse[];
  embeds: MessageEmbedResponse[];
  timestamp: string;
  edited_timestamp?: string;
  flags: number;
  components: (
    | MessageComponentActionRowResponse
    | MessageComponentButtonResponse
    | MessageComponentChannelSelectResponse
    | MessageComponentInputTextResponse
    | MessageComponentMentionableSelectResponse
    | MessageComponentRoleSelectResponse
    | MessageComponentStringSelectResponse
    | MessageComponentUserSelectResponse
  )[];
  resolved?: ResolvedObjectsResponse;
  stickers?: (GuildStickerResponse | StandardStickerResponse)[];
  sticker_items?: MessageStickerItemResponse[];
  id: SnowflakeType;
  channel_id: SnowflakeType;
  author: UserResponse;
  pinned: boolean;
  mention_everyone: boolean;
  tts: boolean;
  call?: MessageCallResponse;
  activity?: MessageActivityResponse;
  application?: BasicApplicationResponse;
  application_id?: SnowflakeType;
  interaction?: MessageInteractionResponse;
  nonce?: number | string;
  webhook_id?: SnowflakeType;
  message_reference?: MessageReferenceResponse;
  thread?: ThreadResponse;
  mention_channels?: (null | MessageMentionChannelResponse)[];
  role_subscription_data?: MessageRoleSubscriptionDataResponse;
  purchase_notification?: PurchaseNotificationResponse;
  position?: number;
  poll?: PollResponse;
  interaction_metadata?:
    | ApplicationCommandInteractionMetadataResponse
    | MessageComponentInteractionMetadataResponse
    | ModalSubmitInteractionMetadataResponse;
  message_snapshots?: MessageSnapshotResponse[];
  reactions?: MessageReactionResponse[];
  referenced_message?: BasicMessageResponse;
}

export interface MessageRoleSubscriptionDataResponse {
  role_subscription_listing_id: SnowflakeType;
  tier_name: string;
  total_months_subscribed: number;
  is_renewal: boolean;
}

export interface MessageSnapshotResponse {
  message?: MinimalContentMessageResponse;
}

export interface MessageStickerItemResponse {
  id: SnowflakeType;
  name: string;
  format_type: StickerFormatTypes;
}

export enum MessageType {
  DEFAULT = 0,
  RECIPIENT_ADD = 1,
  RECIPIENT_REMOVE = 2,
  CALL = 3,
  CHANNEL_NAME_CHANGE = 4,
  CHANNEL_ICON_CHANGE = 5,
  CHANNEL_PINNED_MESSAGE = 6,
  USER_JOIN = 7,
  GUILD_BOOST = 8,
  GUILD_BOOST_TIER_1 = 9,
  GUILD_BOOST_TIER_2 = 10,
  GUILD_BOOST_TIER_3 = 11,
  CHANNEL_FOLLOW_ADD = 12,
  GUILD_DISCOVERY_DISQUALIFIED = 14,
  GUILD_DISCOVERY_REQUALIFIED = 15,
  GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING = 16,
  GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING = 17,
  THREAD_CREATED = 18,
  REPLY = 19,
  CHAT_INPUT_COMMAND = 20,
  THREAD_STARTER_MESSAGE = 21,
  GUILD_INVITE_REMINDER = 22,
  CONTEXT_MENU_COMMAND = 23,
  AUTO_MODERATION_ACTION = 24,
  ROLE_SUBSCRIPTION_PURCHASE = 25,
  INTERACTION_PREMIUM_UPSELL = 26,
  STAGE_START = 27,
  STAGE_END = 28,
  STAGE_SPEAKER = 29,
  STAGE_TOPIC = 31,
  GUILD_APPLICATION_PREMIUM_SUBSCRIPTION = 32,
  GUILD_INCIDENT_ALERT_MODE_ENABLED = 36,
  GUILD_INCIDENT_ALERT_MODE_DISABLED = 37,
  GUILD_INCIDENT_REPORT_RAID = 38,
  GUILD_INCIDENT_REPORT_FALSE_ALARM = 39,
}

export enum MetadataItemTypes {
  /** the metadata value (integer) is less than or equal to the guild's configured value (integer) */
  INTEGER_LESS_THAN_EQUAL = 1,
  /** the metadata value (integer) is greater than or equal to the guild's configured value (integer) */
  INTEGER_GREATER_THAN_EQUAL = 2,
  /** the metadata value (integer) is equal to the guild's configured value (integer) */
  INTEGER_EQUAL = 3,
  /** the metadata value (integer) is not equal to the guild's configured value (integer) */
  INTEGER_NOT_EQUAL = 4,
  /** the metadata value (ISO8601 string) is less than or equal to the guild's configured value (integer; days before current date) */
  DATETIME_LESS_THAN_EQUAL = 5,
  /** the metadata value (ISO8601 string) is greater than or equal to the guild's configured value (integer; days before current date) */
  DATETIME_GREATER_THAN_EQUAL = 6,
  /** the metadata value (integer) is equal to the guild's configured value (integer; 1) */
  BOOLEAN_EQUAL = 7,
  /** the metadata value (integer) is not equal to the guild's configured value (integer; 1) */
  BOOLEAN_NOT_EQUAL = 8,
}

export interface MinimalContentMessageResponse {
  type: MessageType;
  content: string;
  mentions: UserResponse[];
  mention_roles: SnowflakeType[];
  attachments: MessageAttachmentResponse[];
  embeds: MessageEmbedResponse[];
  timestamp: string;
  edited_timestamp?: string;
  flags: number;
  components: (
    | MessageComponentActionRowResponse
    | MessageComponentButtonResponse
    | MessageComponentChannelSelectResponse
    | MessageComponentInputTextResponse
    | MessageComponentMentionableSelectResponse
    | MessageComponentRoleSelectResponse
    | MessageComponentStringSelectResponse
    | MessageComponentUserSelectResponse
  )[];
  resolved?: ResolvedObjectsResponse;
  stickers?: (GuildStickerResponse | StandardStickerResponse)[];
  sticker_items?: MessageStickerItemResponse[];
}

export interface ModalInteractionCallbackData {
  custom_id: string;
  title: string;
  components: ActionRow[];
}

export interface ModalInteractionCallbackRequest {
  type: InteractionCallbackTypes.MODAL;
  data: ModalInteractionCallbackData;
}

export interface ModalSubmitInteractionMetadataResponse {
  id: SnowflakeType;
  type: InteractionTypes.MODAL_SUBMIT;
  user?: UserResponse;
  authorizing_integration_owners: {
    [index: string]: SnowflakeType;
  };
  original_response_message_id?: SnowflakeType;
  triggering_interaction_metadata:
    | ApplicationCommandInteractionMetadataResponse
    | MessageComponentInteractionMetadataResponse;
}

export interface MyGuildResponse {
  id: SnowflakeType;
  name: string;
  icon?: string;
  banner?: string;
  owner: boolean;
  permissions: string;
  features: GuildFeatures[];
  approximate_member_count?: number;
  approximate_presence_count?: number;
}

export interface NewMemberActionResponse {
  channel_id: SnowflakeType;
  action_type: NewMemberActionType;
  title: string;
  description: string;
  emoji?: SettingsEmojiResponse;
  icon?: string;
}

export enum NewMemberActionType {
  VIEW = 0,
  TALK = 1,
}

export interface OAuth2GetAuthorizationResponse {
  application: ApplicationResponse;
  expires: string;
  scopes: OAuth2Scopes[];
  user?: UserResponse;
}

export interface OAuth2GetKeys {
  keys: OAuth2Key[];
}

export interface OAuth2Key {
  kty: string;
  use: string;
  kid: string;
  n: string;
  e: string;
  alg: string;
}

export enum OAuth2Scopes {
  /** allows /users/@me without email */
  IDENTIFY = "identify",
  /** enables /users/@me to return an email */
  EMAIL = "email",
  /** allows /users/@me/connections to return linked third-party accounts */
  CONNECTIONS = "connections",
  /** allows /users/@me/guilds to return basic information about all of a user's guilds */
  GUILDS = "guilds",
  /** allows /guilds/{guild.id}/members/{user.id} to be used for joining users to a guild */
  GUILDS_JOIN = "guilds.join",
  /** allows /users/@me/guilds/{guild.id}/member to return a user's member information in a guild */
  GUILDS_MEMBERS_READ = "guilds.members.read",
  /** allows your app to join users to a group dm */
  GDM_JOIN = "gdm.join",
  /** for oauth2 bots, this puts the bot in the user's selected guild by default */
  BOT = "bot",
  /** for local rpc server access, this allows you to control a user's local Discord client - requires Discord approval */
  RPC = "rpc",
  /** for local rpc server access, this allows you to receive notifications pushed out to the user - requires Discord approval */
  RPC_NOTIFICATIONS_READ = "rpc.notifications.read",
  /** for local rpc server access, this allows you to read a user's voice settings and listen for voice events - requires Discord approval */
  RPC_VOICE_READ = "rpc.voice.read",
  /** for local rpc server access, this allows you to update a user's voice settings - requires Discord approval */
  RPC_VOICE_WRITE = "rpc.voice.write",
  /** for local rpc server access, this allows you to read a user's video status - requires Discord approval */
  RPC_VIDEO_READ = "rpc.video.read",
  /** for local rpc server access, this allows you to update a user's video settings - requires Discord approval */
  RPC_VIDEO_WRITE = "rpc.video.write",
  /** for local rpc server access, this allows you to read a user's screenshare status- requires Discord approval */
  RPC_SCREENSHARE_READ = "rpc.screenshare.read",
  /** for local rpc server access, this allows you to update a user's screenshare settings- requires Discord approval */
  RPC_SCREENSHARE_WRITE = "rpc.screenshare.write",
  /** for local rpc server access, this allows you to update a user's activity - requires Discord approval */
  RPC_ACTIVITIES_WRITE = "rpc.activities.write",
  /** this generates a webhook that is returned in the oauth token response for authorization code grants */
  WEBHOOK_INCOMING = "webhook.incoming",
  /** for local rpc server api access, this allows you to read messages from all client channels (otherwise restricted to channels/guilds your app creates) */
  MESSAGES_READ = "messages.read",
  /** allows your app to upload/update builds for a user's applications - requires Discord approval */
  APPLICATIONS_BUILDS_UPLOAD = "applications.builds.upload",
  /** allows your app to read build data for a user's applications */
  APPLICATIONS_BUILDS_READ = "applications.builds.read",
  /** allows your app to use commands in a guild */
  APPLICATIONS_COMMANDS = "applications.commands",
  /** allows your app to update permissions for its commands in a guild a user has permissions to */
  APPLICATIONS_COMMANDS_PERMISSIONS_UPDATE = "applications.commands.permissions.update",
  /** allows your app to update its commands using a Bearer token - client credentials grant only */
  APPLICATIONS_COMMANDS_UPDATE = "applications.commands.update",
  /** allows your app to read and update store data (SKUs, store listings, achievements, etc.) for a user's applications */
  APPLICATIONS_STORE_UPDATE = "applications.store.update",
  /** allows your app to read entitlements for a user's applications */
  APPLICATIONS_ENTITLEMENTS = "applications.entitlements",
  /** allows your app to fetch data from a user's "Now Playing/Recently Played" list - requires Discord approval */
  ACTIVITIES_READ = "activities.read",
  /** allows your app to update a user's activity - requires Discord approval (NOT REQUIRED FOR GAMESDK ACTIVITY MANAGER) */
  ACTIVITIES_WRITE = "activities.write",
  /** allows your app to know a user's friends and implicit relationships - requires Discord approval */
  RELATIONSHIPS_READ = "relationships.read",
  /** allows your app to connect to voice on user's behalf and see all the voice members - requires Discord approval */
  VOICE = "voice",
  /** allows your app to see information about the user's DMs and group DMs - requires Discord approval */
  DM_CHANNELS_READ = "dm_channels.read",
  /** allows your app to update a user's connection and metadata for the app */
  ROLE_CONNECTIONS_WRITE = "role_connections.write",
  /** for OpenID Connect, this allows your app to receive user id and basic profile information */
  OPENID = "openid",
}

export interface OnboardingPromptOptionRequest {
  id?: SnowflakeType;
  title: string;
  description?: string;
  emoji_id?: SnowflakeType;
  emoji_name?: string;
  emoji_animated?: boolean;
  role_ids?: SnowflakeType[];
  channel_ids?: SnowflakeType[];
}

export interface OnboardingPromptOptionResponse {
  id: SnowflakeType;
  title: string;
  description: string;
  emoji: SettingsEmojiResponse;
  role_ids: SnowflakeType[];
  channel_ids: SnowflakeType[];
}

export interface OnboardingPromptResponse {
  id: SnowflakeType;
  title: string;
  options: OnboardingPromptOptionResponse[];
  single_select: boolean;
  required: boolean;
  in_onboarding: boolean;
  type: OnboardingPromptType;
}

export enum OnboardingPromptType {
  /** Multiple choice options */
  MULTIPLE_CHOICE = 0,
  /** Many options shown as a dropdown */
  DROPDOWN = 1,
}

export interface PartialDiscordIntegrationResponse {
  id: SnowflakeType;
  type: IntegrationTypes.DISCORD;
  name?: string;
  account?: AccountResponse;
  application_id: SnowflakeType;
}

export interface PartialExternalConnectionIntegrationResponse {
  id: SnowflakeType;
  type: IntegrationTypes.TWITCH | IntegrationTypes.YOUTUBE;
  name?: string;
  account?: AccountResponse;
}

export interface PartialGuildSubscriptionIntegrationResponse {
  id: SnowflakeType;
  type: IntegrationTypes.GUILD_SUBSCRIPTION;
  name?: string;
  account?: AccountResponse;
}

export interface PollAnswerCreateRequest {
  poll_media: PollMediaCreateRequest;
}

export interface PollAnswerDetailsResponse {
  users?: UserResponse[];
}

export interface PollAnswerResponse {
  answer_id: number;
  poll_media: PollMediaResponse;
}

export interface PollCreateRequest {
  question: PollMedia;
  answers: PollAnswerCreateRequest[];
  allow_multiselect?: boolean;
  layout_type?: PollLayoutTypes;
  duration?: number;
}

export interface PollEmoji {
  id?: SnowflakeType;
  name?: string;
  animated?: boolean;
}

export interface PollEmojiCreateRequest {
  id?: SnowflakeType;
  name?: string;
  animated?: boolean;
}

export enum PollLayoutTypes {}

export interface PollMedia {
  text?: string;
  emoji?: PollEmoji;
}

export interface PollMediaCreateRequest {
  text?: string;
  emoji?: PollEmojiCreateRequest;
}

export interface PollMediaResponse {
  text?: string;
  emoji?: MessageReactionEmojiResponse;
}

export interface PollResponse {
  question: PollMediaResponse;
  answers: PollAnswerResponse[];
  expiry: string;
  allow_multiselect: boolean;
  layout_type: PollLayoutTypes;
  results: PollResultsResponse;
}

export interface PollResultsEntryResponse {
  id: number;
  count: number;
  me_voted?: boolean;
}

export interface PollResultsResponse {
  answer_counts?: PollResultsEntryResponse[];
  is_finalized: boolean;
}

export interface PongInteractionCallbackRequest {
  type: InteractionCallbackTypes.PONG;
}

export enum PremiumGuildTiers {
  /** Guild has not unlocked any Server Boost perks */
  NONE = 0,
  /** Guild has unlocked Server Boost level 1 perks */
  TIER_1 = 1,
  /** Guild has unlocked Server Boost level 2 perks */
  TIER_2 = 2,
  /** Guild has unlocked Server Boost level 3 perks */
  TIER_3 = 3,
}

export enum PremiumTypes {
  /** None */
  NONE = 0,
  /** Nitro Classic */
  TIER_1 = 1,
  /** Nitro Standard */
  TIER_2 = 2,
  /** Nitro Basic */
  TIER_0 = 3,
}

export interface PrivateApplicationResponse {
  id: SnowflakeType;
  name: string;
  icon?: string;
  description: string;
  type?: ApplicationTypes;
  cover_image?: string;
  primary_sku_id?: SnowflakeType;
  bot?: UserResponse;
  slug?: string;
  guild_id?: SnowflakeType;
  rpc_origins?: (string | null)[];
  bot_public?: boolean;
  bot_require_code_grant?: boolean;
  terms_of_service_url?: string;
  privacy_policy_url?: string;
  custom_install_url?: string;
  install_params?: ApplicationOAuth2InstallParamsResponse;
  integration_types_config?: {
    [index: string]: ApplicationIntegrationTypeConfigurationResponse;
  };
  verify_key: string;
  flags: number;
  max_participants?: number;
  tags?: string[];
  redirect_uris: (string | null)[];
  interactions_endpoint_url?: string;
  role_connections_verification_url?: string;
  owner: UserResponse;
  approximate_guild_count?: number;
  approximate_user_install_count: number;
  explicit_content_filter: ApplicationExplicitContentFilterTypes;
  team?: TeamResponse;
}

export interface PrivateChannelLocation {
  id: string;
  kind: ActivityLocationKinds.PRIVATE_CHANNEL;
  channel_id: SnowflakeType;
}

export interface PrivateChannelRequestPartial {
  name?: string;
  icon?: string;
}

export interface PrivateChannelResponse {
  id: SnowflakeType;
  type: ChannelTypes.DM;
  last_message_id?: SnowflakeType;
  flags: number;
  last_pin_timestamp?: string;
  recipients: UserResponse[];
}

export interface PrivateGroupChannelResponse {
  id: SnowflakeType;
  type: ChannelTypes.GROUP_DM;
  last_message_id?: SnowflakeType;
  flags: number;
  last_pin_timestamp?: string;
  recipients: UserResponse[];
  name?: string;
  icon?: string;
  owner_id?: SnowflakeType;
  managed?: boolean;
  application_id?: SnowflakeType;
}

export interface PrivateGuildMemberResponse {
  avatar?: string;
  avatar_decoration_data?: UserAvatarDecorationResponse;
  banner?: string;
  communication_disabled_until?: string;
  flags: number;
  joined_at: string;
  nick?: string;
  pending: boolean;
  premium_since?: string;
  roles: SnowflakeType[];
  user: UserResponse;
  mute: boolean;
  deaf: boolean;
}

export interface PurchaseNotificationResponse {
  type: PurchaseType;
  guild_product_purchase?: GuildProductPurchaseResponse;
}

export enum PurchaseType {
  GUILD_PRODUCT = 0,
}

export interface QuarantineUserAction {
  type: AutomodActionType.QUARANTINE_USER;
  metadata?: QuarantineUserActionMetadata;
}

export interface QuarantineUserActionMetadata {}

export interface QuarantineUserActionMetadataResponse {}

export interface QuarantineUserActionResponse {
  type: AutomodActionType.QUARANTINE_USER;
  metadata: QuarantineUserActionMetadataResponse;
}

export enum ReactionTypes {
  /** Normal reaction type */
  NORMAL = 0,
  /** Burst reaction type */
  BURST = 1,
}

export interface ResolvedObjectsResponse {
  users: {
    [index: string]: UserResponse;
  };
  members: {
    [index: string]: GuildMemberResponse;
  };
  channels: {
    [index: string]:
      | GuildChannelResponse
      | PrivateChannelResponse
      | PrivateGroupChannelResponse
      | ThreadResponse;
  };
  roles: {
    [index: string]: GuildRoleResponse;
  };
}

export interface ResourceChannelResponse {
  channel_id: SnowflakeType;
  title: string;
  emoji?: SettingsEmojiResponse;
  icon?: string;
  description: string;
}

export interface RichEmbed {
  type?: string;
  url?: string;
  title?: string;
  color?: number;
  timestamp?: string;
  description?: string;
  author?: RichEmbedAuthor;
  image?: RichEmbedImage;
  thumbnail?: RichEmbedThumbnail;
  footer?: RichEmbedFooter;
  fields?: RichEmbedField[];
  provider?: RichEmbedProvider;
  video?: RichEmbedVideo;
}

export interface RichEmbedAuthor {
  name?: string;
  url?: string;
  icon_url?: string;
}

export interface RichEmbedField {
  name: string;
  value: string;
  inline?: boolean;
}

export interface RichEmbedFooter {
  text?: string;
  icon_url?: string;
}

export interface RichEmbedImage {
  url?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  placeholder_version?: number;
}

export interface RichEmbedProvider {
  name?: string;
  url?: string;
}

export interface RichEmbedThumbnail {
  url?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  placeholder_version?: number;
}

export interface RichEmbedVideo {
  url?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  placeholder_version?: number;
}

export interface RoleSelect {
  type: MessageComponentTypes.ROLE_SELECT;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  default_values?: RoleSelectDefaultValue[];
}

export interface RoleSelectDefaultValue {
  type: SnowflakeSelectDefaultValueTypes.ROLE;
  id: SnowflakeType;
}

export interface RoleSelectDefaultValueResponse {
  type: SnowflakeSelectDefaultValueTypes.ROLE;
  id: SnowflakeType;
}

export interface ScheduledEventResponse {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  name: string;
  description?: string;
  channel_id?: SnowflakeType;
  creator_id?: SnowflakeType;
  creator?: UserResponse;
  image?: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  status: GuildScheduledEventStatuses;
  entity_type: GuildScheduledEventEntityTypes;
  entity_id?: SnowflakeType;
  user_count?: number;
  privacy_level: GuildScheduledEventPrivacyLevels;
  user_rsvp?: ScheduledEventUserResponse;
}

export interface ScheduledEventUserResponse {
  guild_scheduled_event_id: SnowflakeType;
  user_id: SnowflakeType;
  user?: UserResponse;
  member?: GuildMemberResponse;
}

export interface SelectOption {
  label: string;
  value: string;
  description?: string;
  emoji?: Emoji;
  default?: boolean;
}

export interface SelectOptionResponse {
  label: string;
  value: string;
  description?: string;
  emoji?: MessageComponentEmojiResponse;
  default?: boolean;
}

export interface SettingsEmojiResponse {
  id?: SnowflakeType;
  name?: string;
  animated?: boolean;
}

export interface SlackWebhook {
  text?: string;
  username?: string;
  icon_url?: string;
  attachments?: WebhookSlackEmbed[];
}

export enum SnowflakeSelectDefaultValueTypes {
  USER = "user",
  ROLE = "role",
  CHANNEL = "channel",
}

type SnowflakeType = string;

export interface SoundboardCreateRequest {
  name: string;
  volume?: number;
  emoji_id?: SnowflakeType;
  emoji_name?: string;
  sound: string;
}

export interface SoundboardPatchRequestPartial {
  name?: string;
  volume?: number;
  emoji_id?: SnowflakeType;
  emoji_name?: string;
}

export interface SoundboardSoundResponse {
  name: string;
  sound_id: SnowflakeType;
  volume: number;
  emoji_id?: SnowflakeType;
  emoji_name?: string;
  guild_id?: SnowflakeType;
  available: boolean;
  user?: UserResponse;
}

export interface SoundboardSoundSendRequest {
  sound_id: SnowflakeType;
  source_guild_id?: SnowflakeType;
}

export interface SpamLinkRuleResponse {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  creator_id: SnowflakeType;
  name: string;
  event_type: AutomodEventType;
  actions: (
    | BlockMessageActionResponse
    | FlagToChannelActionResponse
    | QuarantineUserActionResponse
    | UserCommunicationDisabledActionResponse
  )[];
  trigger_type: AutomodTriggerType.SPAM_LINK;
  enabled?: boolean;
  exempt_roles?: SnowflakeType[];
  exempt_channels?: SnowflakeType[];
  trigger_metadata: SpamLinkTriggerMetadataResponse;
}

export interface SpamLinkTriggerMetadataResponse {}

export interface StageInstanceResponse {
  guild_id: SnowflakeType;
  channel_id: SnowflakeType;
  topic: string;
  privacy_level: StageInstancesPrivacyLevels;
  id: SnowflakeType;
  discoverable_disabled?: boolean;
  guild_scheduled_event_id?: SnowflakeType;
}

export enum StageInstancesPrivacyLevels {
  /** The Stage instance is visible publicly. (deprecated) */
  PUBLIC = 1,
  /** The Stage instance is visible publicly. (deprecated) */
  GUILD_ONLY = 2,
}

export interface StageScheduledEventCreateRequest {
  name: string;
  description?: string;
  image?: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  privacy_level: GuildScheduledEventPrivacyLevels;
  entity_type: GuildScheduledEventEntityTypes.STAGE_INSTANCE;
  channel_id?: SnowflakeType;
  entity_metadata?: EntityMetadataStageInstance;
}

export interface StageScheduledEventPatchRequestPartial {
  status?: GuildScheduledEventStatuses;
  name?: string;
  description?: string;
  image?: string;
  scheduled_start_time?: string;
  scheduled_end_time?: string;
  entity_type?: GuildScheduledEventEntityTypes.STAGE_INSTANCE;
  privacy_level?: GuildScheduledEventPrivacyLevels;
  channel_id?: SnowflakeType;
  entity_metadata?: EntityMetadataStageInstance;
}

export interface StageScheduledEventResponse {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  name: string;
  description?: string;
  channel_id?: SnowflakeType;
  creator_id?: SnowflakeType;
  creator?: UserResponse;
  image?: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  status: GuildScheduledEventStatuses;
  entity_type: GuildScheduledEventEntityTypes.STAGE_INSTANCE;
  entity_id?: SnowflakeType;
  user_count?: number;
  privacy_level: GuildScheduledEventPrivacyLevels;
  user_rsvp?: ScheduledEventUserResponse;
  entity_metadata?: EntityMetadataStageInstanceResponse;
}

export interface StandardStickerResponse {
  id: SnowflakeType;
  name: string;
  tags: string;
  type: StickerTypes.STANDARD;
  format_type?: StickerFormatTypes;
  description?: string;
  pack_id: SnowflakeType;
  sort_value: number;
}

export enum StickerFormatTypes {
  PNG = 1,
  APNG = 2,
  LOTTIE = 3,
  GIF = 4,
}

export interface StickerPackCollectionResponse {
  sticker_packs: StickerPackResponse[];
}

export interface StickerPackResponse {
  id: SnowflakeType;
  sku_id: SnowflakeType;
  name: string;
  description?: string;
  stickers: StandardStickerResponse[];
  cover_sticker_id?: SnowflakeType;
  banner_asset_id?: SnowflakeType;
}

export enum StickerTypes {
  /** an official sticker in a pack, part of Nitro or in a removed purchasable pack */
  STANDARD = 1,
  /** a sticker uploaded to a guild for the guild's members */
  GUILD = 2,
}

export interface StringSelect {
  type: MessageComponentTypes.STRING_SELECT;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  options: SelectOption[];
}

export interface TeamMemberResponse {
  user: UserResponse;
  team_id: SnowflakeType;
  membership_state: TeamMembershipStates;
}

export enum TeamMembershipStates {
  /** User has been invited to the team. */
  INVITED = 1,
  /** User has accepted the team invitation. */
  ACCEPTED = 2,
}

export interface TeamResponse {
  id: SnowflakeType;
  icon?: string;
  name: string;
  owner_user_id: SnowflakeType;
  members: TeamMemberResponse[];
}

export enum TextStyleTypes {
  /** Single-line input */
  SHORT = 1,
  /** Multi-line input */
  PARAGRAPH = 2,
}

export enum ThreadAutoArchiveDuration {
  /** One hour */
  ONE_HOUR = 60,
  /** One day */
  ONE_DAY = 1440,
  /** Three days */
  THREE_DAY = 4320,
  /** Seven days */
  SEVEN_DAY = 10080,
}

export interface ThreadMemberResponse {
  id: SnowflakeType;
  user_id: SnowflakeType;
  join_timestamp: string;
  flags: number;
  member?: GuildMemberResponse;
}

export interface ThreadMetadataResponse {
  archived: boolean;
  archive_timestamp?: string;
  auto_archive_duration: ThreadAutoArchiveDuration;
  locked: boolean;
  create_timestamp?: string;
  invitable?: boolean;
}

export interface ThreadResponse {
  id: SnowflakeType;
  type:
    | ChannelTypes.ANNOUNCEMENT_THREAD
    | ChannelTypes.PUBLIC_THREAD
    | ChannelTypes.PRIVATE_THREAD;
  last_message_id?: SnowflakeType;
  flags: number;
  last_pin_timestamp?: string;
  guild_id: SnowflakeType;
  name: string;
  parent_id?: SnowflakeType;
  rate_limit_per_user?: number;
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string;
  video_quality_mode?: VideoQualityModes;
  permissions?: string;
  owner_id: SnowflakeType;
  thread_metadata?: ThreadMetadataResponse;
  message_count: number;
  member_count: number;
  total_message_sent: number;
  applied_tags?: SnowflakeType[];
  member?: ThreadMemberResponse;
}

export enum ThreadSortOrder {
  /** Sort forum posts by activity */
  LATEST_ACTIVITY = 0,
  /** Sort forum posts by creation time (from most recent to oldest) */
  CREATION_DATE = 1,
}

export interface ThreadsResponse {
  threads: ThreadResponse[];
  members: ThreadMemberResponse[];
  has_more?: boolean;
}

export interface TypingIndicatorResponse {}

type UInt32Type = number;

export interface UpdateDefaultReactionEmojiRequest {
  emoji_id?: SnowflakeType;
  emoji_name?: string;
}

export interface UpdateGuildChannelRequestPartial {
  type?:
    | ChannelTypes.GUILD_TEXT
    | ChannelTypes.GUILD_VOICE
    | ChannelTypes.GUILD_CATEGORY
    | ChannelTypes.GUILD_ANNOUNCEMENT
    | ChannelTypes.GUILD_STAGE_VOICE
    | ChannelTypes.GUILD_DIRECTORY
    | ChannelTypes.GUILD_FORUM;
  name?: string;
  position?: number;
  topic?: string;
  bitrate?: number;
  user_limit?: number;
  nsfw?: boolean;
  rate_limit_per_user?: number;
  parent_id?: SnowflakeType;
  permission_overwrites?: ChannelPermissionOverwriteRequest[];
  rtc_region?: string;
  video_quality_mode?: VideoQualityModes;
  default_auto_archive_duration?: ThreadAutoArchiveDuration;
  default_reaction_emoji?: UpdateDefaultReactionEmojiRequest;
  default_thread_rate_limit_per_user?: number;
  default_sort_order?: ThreadSortOrder;
  default_forum_layout?: ForumLayout;
  flags?: number;
  available_tags?: UpdateThreadTagRequest[];
}

export interface UpdateGuildOnboardingRequest {
  prompts?: UpdateOnboardingPromptRequest[];
  enabled?: boolean;
  default_channel_ids?: SnowflakeType[];
  mode?: GuildOnboardingMode;
}

export interface UpdateMessageInteractionCallbackRequest {
  type:
    | InteractionCallbackTypes.DEFERRED_UPDATE_MESSAGE
    | InteractionCallbackTypes.UPDATE_MESSAGE;
  data?: IncomingWebhookUpdateForInteractionCallbackRequestPartial;
}

export interface UpdateMessageInteractionCallbackResponse {
  type: InteractionCallbackTypes.UPDATE_MESSAGE;
  message: MessageResponse;
}

export interface UpdateOnboardingPromptRequest {
  title: string;
  options: OnboardingPromptOptionRequest[];
  single_select?: boolean;
  required?: boolean;
  in_onboarding?: boolean;
  type?: OnboardingPromptType;
  id: SnowflakeType;
}

export interface UpdateThreadRequestPartial {
  name?: string;
  archived?: boolean;
  locked?: boolean;
  invitable?: boolean;
  auto_archive_duration?: ThreadAutoArchiveDuration;
  rate_limit_per_user?: number;
  flags?: number;
  applied_tags?: SnowflakeType[];
  bitrate?: number;
  user_limit?: number;
  rtc_region?: string;
  video_quality_mode?: VideoQualityModes;
}

export interface UpdateThreadTagRequest {
  name: string;
  emoji_id?: SnowflakeType;
  emoji_name?: string;
  moderated?: boolean;
  id?: SnowflakeType;
}

export interface UserAvatarDecorationResponse {
  asset: string;
  sku_id?: SnowflakeType;
}

export interface UserCommunicationDisabledAction {
  type: AutomodActionType.USER_COMMUNICATION_DISABLED;
  metadata: UserCommunicationDisabledActionMetadata;
}

export interface UserCommunicationDisabledActionMetadata {
  duration_seconds?: number;
}

export interface UserCommunicationDisabledActionMetadataResponse {
  duration_seconds: number;
}

export interface UserCommunicationDisabledActionResponse {
  type: AutomodActionType.USER_COMMUNICATION_DISABLED;
  metadata: UserCommunicationDisabledActionMetadataResponse;
}

export interface UserGuildOnboardingResponse {
  guild_id: SnowflakeType;
  prompts: OnboardingPromptResponse[];
  default_channel_ids: SnowflakeType[];
  enabled: boolean;
}

export enum UserNotificationSettings {
  /** members will receive notifications for all messages by default */
  ALL_MESSAGES = 0,
  /** members will receive notifications only for messages that @mention them by default */
  ONLY_MENTIONS = 1,
}

export interface UserPIIResponse {
  id: SnowflakeType;
  username: string;
  avatar?: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  bot?: boolean;
  system?: boolean;
  banner?: string;
  accent_color?: number;
  global_name?: string;
  avatar_decoration_data?: UserAvatarDecorationResponse;
  mfa_enabled: boolean;
  locale: AvailableLocalesEnum;
  premium_type?: PremiumTypes;
  email?: string;
  verified?: boolean;
}

export interface UserResponse {
  id: SnowflakeType;
  username: string;
  avatar?: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  bot?: boolean;
  system?: boolean;
  banner?: string;
  accent_color?: number;
  global_name?: string;
  avatar_decoration_data?: UserAvatarDecorationResponse;
}

export interface UserSelect {
  type: MessageComponentTypes.USER_SELECT;
  custom_id: string;
  placeholder?: string;
  min_values?: number;
  max_values?: number;
  disabled?: boolean;
  default_values?: UserSelectDefaultValue[];
}

export interface UserSelectDefaultValue {
  type: SnowflakeSelectDefaultValueTypes.USER;
  id: SnowflakeType;
}

export interface UserSelectDefaultValueResponse {
  type: SnowflakeSelectDefaultValueTypes.USER;
  id: SnowflakeType;
}

export interface VanityURLErrorResponse {
  message: string;
  code: number;
}

export interface VanityURLResponse {
  code?: string;
  uses: number;
  error?: VanityURLErrorResponse;
}

export enum VerificationLevels {
  /** unrestricted */
  NONE = 0,
  /** must have verified email on account */
  LOW = 1,
  /** must be registered on Discord for longer than 5 minutes */
  MEDIUM = 2,
  /** must be a member of the server for longer than 10 minutes */
  HIGH = 3,
  /** must have a verified phone number */
  VERY_HIGH = 4,
}

export enum VideoQualityModes {
  /** Discord chooses the quality for optimal performance */
  AUTO = 1,
  /** 720p */
  FULL = 2,
}

export interface VoiceRegionResponse {
  id: string;
  name: string;
  custom: boolean;
  deprecated: boolean;
  optimal: boolean;
}

export interface VoiceScheduledEventCreateRequest {
  name: string;
  description?: string;
  image?: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  privacy_level: GuildScheduledEventPrivacyLevels;
  entity_type: GuildScheduledEventEntityTypes.VOICE;
  channel_id?: SnowflakeType;
  entity_metadata?: EntityMetadataVoice;
}

export interface VoiceScheduledEventPatchRequestPartial {
  status?: GuildScheduledEventStatuses;
  name?: string;
  description?: string;
  image?: string;
  scheduled_start_time?: string;
  scheduled_end_time?: string;
  entity_type?: GuildScheduledEventEntityTypes.VOICE;
  privacy_level?: GuildScheduledEventPrivacyLevels;
  channel_id?: SnowflakeType;
  entity_metadata?: EntityMetadataVoice;
}

export interface VoiceScheduledEventResponse {
  id: SnowflakeType;
  guild_id: SnowflakeType;
  name: string;
  description?: string;
  channel_id?: SnowflakeType;
  creator_id?: SnowflakeType;
  creator?: UserResponse;
  image?: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  status: GuildScheduledEventStatuses;
  entity_type: GuildScheduledEventEntityTypes.VOICE;
  entity_id?: SnowflakeType;
  user_count?: number;
  privacy_level: GuildScheduledEventPrivacyLevels;
  user_rsvp?: ScheduledEventUserResponse;
  entity_metadata?: EntityMetadataVoiceResponse;
}

export interface VoiceStateResponse {
  channel_id?: SnowflakeType;
  deaf: boolean;
  guild_id?: SnowflakeType;
  member?: GuildMemberResponse;
  mute: boolean;
  request_to_speak_timestamp?: string;
  suppress: boolean;
  self_stream?: boolean;
  self_deaf: boolean;
  self_mute: boolean;
  self_video: boolean;
  session_id: string;
  user_id: SnowflakeType;
}

export interface WebhookSlackEmbed {
  title?: string;
  title_link?: string;
  text?: string;
  color?: string;
  ts?: number;
  pretext?: string;
  footer?: string;
  footer_icon?: string;
  author_name?: string;
  author_link?: string;
  author_icon?: string;
  image_url?: string;
  thumb_url?: string;
  fields?: WebhookSlackEmbedField[];
}

export interface WebhookSlackEmbedField {
  name?: string;
  value?: string;
  inline?: boolean;
}

export interface WebhookSourceChannelResponse {
  id: SnowflakeType;
  name: string;
}

export interface WebhookSourceGuildResponse {
  id: SnowflakeType;
  icon?: string;
  name: string;
}

export enum WebhookTypes {
  /** Incoming Webhooks can post messages to channels with a generated token */
  GUILD_INCOMING = 1,
  /** Channel Follower Webhooks are internal webhooks used with Channel Following to post new messages into channels */
  CHANNEL_FOLLOWER = 2,
  /** Application webhooks are webhooks used with Interactions */
  APPLICATION_INCOMING = 3,
}

export interface WelcomeMessageResponse {
  author_ids: SnowflakeType[];
  message: string;
}

export interface WelcomeScreenPatchRequestPartial {
  description?: string;
  welcome_channels?: GuildWelcomeChannel[];
  enabled?: boolean;
}

export interface WidgetActivity {
  name: string;
}

export interface WidgetChannel {
  id: SnowflakeType;
  name: string;
  position: number;
}

export enum WidgetImageStyles {
  /** shield style widget with Discord icon and guild members online count */
  SHIELD = "shield",
  /** large image with guild icon, name and online count. "POWERED BY DISCORD" as the footer of the widget */
  BANNER1 = "banner1",
  /** smaller widget style with guild icon, name and online count. Split on the right with Discord logo */
  BANNER2 = "banner2",
  /** large image with guild icon, name and online count. In the footer, Discord logo on the left and "Chat Now" on the right */
  BANNER3 = "banner3",
  /** large Discord logo at the top of the widget. Guild icon, name and online count in the middle portion of the widget and a "JOIN MY SERVER" button at the bottom */
  BANNER4 = "banner4",
}

export interface WidgetMember {
  id: string;
  username: string;
  discriminator: WidgetUserDiscriminator;
  avatar?: null;
  status: string;
  avatar_url: string;
  activity?: WidgetActivity;
  deaf?: boolean;
  mute?: boolean;
  self_deaf?: boolean;
  self_mute?: boolean;
  suppress?: boolean;
  channel_id?: SnowflakeType;
}

export interface WidgetResponse {
  id: SnowflakeType;
  name: string;
  instant_invite?: string;
  channels: WidgetChannel[];
  members: WidgetMember[];
  presence_count: number;
}

export interface WidgetSettingsResponse {
  enabled: boolean;
  channel_id?: SnowflakeType;
}

export enum WidgetUserDiscriminator {
  ZEROES = "0000",
}

export interface Error {
  code: number;
  message: string;
}

export interface InnerErrors {
  _errors: Error[];
}

type ErrorDetails =
  | {
      [index: string]: ErrorDetails;
    }
  | InnerErrors;

export interface ErrorResponse {}
