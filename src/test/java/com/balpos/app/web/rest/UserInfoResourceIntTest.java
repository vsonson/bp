package com.balpos.app.web.rest;

import com.balpos.app.BalancepositionApp;

import com.balpos.app.domain.UserInfo;
import com.balpos.app.repository.UserInfoRepository;
import com.balpos.app.service.UserInfoService;
import com.balpos.app.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static com.balpos.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.balpos.app.domain.enumeration.UserStatus;
import com.balpos.app.domain.enumeration.UserType;
/**
 * Test class for the UserInfoResource REST controller.
 *
 * @see UserInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BalancepositionApp.class)
public class UserInfoResourceIntTest {

    private static final UserStatus DEFAULT_USERSTATUS = UserStatus.ACTIVE;
    private static final UserStatus UPDATED_USERSTATUS = UserStatus.INVITED;

    private static final UserType DEFAULT_USER_TYPE = UserType.STUDENTATHLETE;
    private static final UserType UPDATED_USER_TYPE = UserType.ADMIN;

    private static final String DEFAULT_YEAR_OF_BIRTH = "AAAAAAAAAA";
    private static final String UPDATED_YEAR_OF_BIRTH = "BBBBBBBBBB";

    private static final String DEFAULT_GENDER = "AAAAAAAAAA";
    private static final String UPDATED_GENDER = "BBBBBBBBBB";

    private static final String DEFAULT_PRIMARY_SPORT = "AAAAAAAAAA";
    private static final String UPDATED_PRIMARY_SPORT = "BBBBBBBBBB";

    private static final String DEFAULT_EDUCATION_LEVEL = "AAAAAAAAAA";
    private static final String UPDATED_EDUCATION_LEVEL = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY_CODE = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_STATE_CODE = "AAAAAAAAAA";
    private static final String UPDATED_STATE_CODE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_LAST_QUOTE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_LAST_QUOTE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final Long DEFAULT_LAST_QUOTE_ID = 1L;
    private static final Long UPDATED_LAST_QUOTE_ID = 2L;

    @Autowired
    private UserInfoRepository userInfoRepository;

    @Autowired
    private UserInfoService userInfoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserInfoMockMvc;

    private UserInfo userInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserInfoResource userInfoResource = new UserInfoResource(userInfoService);
        this.restUserInfoMockMvc = MockMvcBuilders.standaloneSetup(userInfoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserInfo createEntity(EntityManager em) {
        UserInfo userInfo = new UserInfo()
            .userstatus(DEFAULT_USERSTATUS)
            .userType(DEFAULT_USER_TYPE)
            .yearOfBirth(DEFAULT_YEAR_OF_BIRTH)
            .gender(DEFAULT_GENDER)
            .primarySport(DEFAULT_PRIMARY_SPORT)
            .educationLevel(DEFAULT_EDUCATION_LEVEL)
            .countryCode(DEFAULT_COUNTRY_CODE)
            .stateCode(DEFAULT_STATE_CODE)
            .lastQuoteDate(DEFAULT_LAST_QUOTE_DATE)
            .lastQuoteId(DEFAULT_LAST_QUOTE_ID);
        return userInfo;
    }

    @Before
    public void initTest() {
        userInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserInfo() throws Exception {
        int databaseSizeBeforeCreate = userInfoRepository.findAll().size();

        // Create the UserInfo
        restUserInfoMockMvc.perform(post("/api/user-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userInfo)))
            .andExpect(status().isCreated());

        // Validate the UserInfo in the database
        List<UserInfo> userInfoList = userInfoRepository.findAll();
        assertThat(userInfoList).hasSize(databaseSizeBeforeCreate + 1);
        UserInfo testUserInfo = userInfoList.get(userInfoList.size() - 1);
        assertThat(testUserInfo.getUserstatus()).isEqualTo(DEFAULT_USERSTATUS);
        assertThat(testUserInfo.getUserType()).isEqualTo(DEFAULT_USER_TYPE);
        assertThat(testUserInfo.getYearOfBirth()).isEqualTo(DEFAULT_YEAR_OF_BIRTH);
        assertThat(testUserInfo.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testUserInfo.getPrimarySport()).isEqualTo(DEFAULT_PRIMARY_SPORT);
        assertThat(testUserInfo.getEducationLevel()).isEqualTo(DEFAULT_EDUCATION_LEVEL);
        assertThat(testUserInfo.getCountryCode()).isEqualTo(DEFAULT_COUNTRY_CODE);
        assertThat(testUserInfo.getStateCode()).isEqualTo(DEFAULT_STATE_CODE);
        assertThat(testUserInfo.getLastQuoteDate()).isEqualTo(DEFAULT_LAST_QUOTE_DATE);
        assertThat(testUserInfo.getLastQuoteId()).isEqualTo(DEFAULT_LAST_QUOTE_ID);
    }

    @Test
    @Transactional
    public void createUserInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userInfoRepository.findAll().size();

        // Create the UserInfo with an existing ID
        userInfo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserInfoMockMvc.perform(post("/api/user-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userInfo)))
            .andExpect(status().isBadRequest());

        // Validate the UserInfo in the database
        List<UserInfo> userInfoList = userInfoRepository.findAll();
        assertThat(userInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserInfos() throws Exception {
        // Initialize the database
        userInfoRepository.saveAndFlush(userInfo);

        // Get all the userInfoList
        restUserInfoMockMvc.perform(get("/api/user-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userInfo.getId().intValue())))
            .andExpect(jsonPath("$.[*].userstatus").value(hasItem(DEFAULT_USERSTATUS.toString())))
            .andExpect(jsonPath("$.[*].userType").value(hasItem(DEFAULT_USER_TYPE.toString())))
            .andExpect(jsonPath("$.[*].yearOfBirth").value(hasItem(DEFAULT_YEAR_OF_BIRTH.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].primarySport").value(hasItem(DEFAULT_PRIMARY_SPORT.toString())))
            .andExpect(jsonPath("$.[*].educationLevel").value(hasItem(DEFAULT_EDUCATION_LEVEL.toString())))
            .andExpect(jsonPath("$.[*].countryCode").value(hasItem(DEFAULT_COUNTRY_CODE.toString())))
            .andExpect(jsonPath("$.[*].stateCode").value(hasItem(DEFAULT_STATE_CODE.toString())))
            .andExpect(jsonPath("$.[*].lastQuoteDate").value(hasItem(DEFAULT_LAST_QUOTE_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastQuoteId").value(hasItem(DEFAULT_LAST_QUOTE_ID.intValue())));
    }

    @Test
    @Transactional
    public void getUserInfo() throws Exception {
        // Initialize the database
        userInfoRepository.saveAndFlush(userInfo);

        // Get the userInfo
        restUserInfoMockMvc.perform(get("/api/user-infos/{id}", userInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userInfo.getId().intValue()))
            .andExpect(jsonPath("$.userstatus").value(DEFAULT_USERSTATUS.toString()))
            .andExpect(jsonPath("$.userType").value(DEFAULT_USER_TYPE.toString()))
            .andExpect(jsonPath("$.yearOfBirth").value(DEFAULT_YEAR_OF_BIRTH.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.primarySport").value(DEFAULT_PRIMARY_SPORT.toString()))
            .andExpect(jsonPath("$.educationLevel").value(DEFAULT_EDUCATION_LEVEL.toString()))
            .andExpect(jsonPath("$.countryCode").value(DEFAULT_COUNTRY_CODE.toString()))
            .andExpect(jsonPath("$.stateCode").value(DEFAULT_STATE_CODE.toString()))
            .andExpect(jsonPath("$.lastQuoteDate").value(DEFAULT_LAST_QUOTE_DATE.toString()))
            .andExpect(jsonPath("$.lastQuoteId").value(DEFAULT_LAST_QUOTE_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserInfo() throws Exception {
        // Get the userInfo
        restUserInfoMockMvc.perform(get("/api/user-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserInfo() throws Exception {
        // Initialize the database
        userInfoService.save(userInfo);

        int databaseSizeBeforeUpdate = userInfoRepository.findAll().size();

        // Update the userInfo
        UserInfo updatedUserInfo = userInfoRepository.findOne(userInfo.getId());
        // Disconnect from session so that the updates on updatedUserInfo are not directly saved in db
        em.detach(updatedUserInfo);
        updatedUserInfo
            .userstatus(UPDATED_USERSTATUS)
            .userType(UPDATED_USER_TYPE)
            .yearOfBirth(UPDATED_YEAR_OF_BIRTH)
            .gender(UPDATED_GENDER)
            .primarySport(UPDATED_PRIMARY_SPORT)
            .educationLevel(UPDATED_EDUCATION_LEVEL)
            .countryCode(UPDATED_COUNTRY_CODE)
            .stateCode(UPDATED_STATE_CODE)
            .lastQuoteDate(UPDATED_LAST_QUOTE_DATE)
            .lastQuoteId(UPDATED_LAST_QUOTE_ID);

        restUserInfoMockMvc.perform(put("/api/user-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserInfo)))
            .andExpect(status().isOk());

        // Validate the UserInfo in the database
        List<UserInfo> userInfoList = userInfoRepository.findAll();
        assertThat(userInfoList).hasSize(databaseSizeBeforeUpdate);
        UserInfo testUserInfo = userInfoList.get(userInfoList.size() - 1);
        assertThat(testUserInfo.getUserstatus()).isEqualTo(UPDATED_USERSTATUS);
        assertThat(testUserInfo.getUserType()).isEqualTo(UPDATED_USER_TYPE);
        assertThat(testUserInfo.getYearOfBirth()).isEqualTo(UPDATED_YEAR_OF_BIRTH);
        assertThat(testUserInfo.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testUserInfo.getPrimarySport()).isEqualTo(UPDATED_PRIMARY_SPORT);
        assertThat(testUserInfo.getEducationLevel()).isEqualTo(UPDATED_EDUCATION_LEVEL);
        assertThat(testUserInfo.getCountryCode()).isEqualTo(UPDATED_COUNTRY_CODE);
        assertThat(testUserInfo.getStateCode()).isEqualTo(UPDATED_STATE_CODE);
        assertThat(testUserInfo.getLastQuoteDate()).isEqualTo(UPDATED_LAST_QUOTE_DATE);
        assertThat(testUserInfo.getLastQuoteId()).isEqualTo(UPDATED_LAST_QUOTE_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingUserInfo() throws Exception {
        int databaseSizeBeforeUpdate = userInfoRepository.findAll().size();

        // Create the UserInfo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserInfoMockMvc.perform(put("/api/user-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userInfo)))
            .andExpect(status().isCreated());

        // Validate the UserInfo in the database
        List<UserInfo> userInfoList = userInfoRepository.findAll();
        assertThat(userInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserInfo() throws Exception {
        // Initialize the database
        userInfoService.save(userInfo);

        int databaseSizeBeforeDelete = userInfoRepository.findAll().size();

        // Get the userInfo
        restUserInfoMockMvc.perform(delete("/api/user-infos/{id}", userInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserInfo> userInfoList = userInfoRepository.findAll();
        assertThat(userInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserInfo.class);
        UserInfo userInfo1 = new UserInfo();
        userInfo1.setId(1L);
        UserInfo userInfo2 = new UserInfo();
        userInfo2.setId(userInfo1.getId());
        assertThat(userInfo1).isEqualTo(userInfo2);
        userInfo2.setId(2L);
        assertThat(userInfo1).isNotEqualTo(userInfo2);
        userInfo1.setId(null);
        assertThat(userInfo1).isNotEqualTo(userInfo2);
    }
}
