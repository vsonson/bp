package com.balpos.app.web.rest;

import com.balpos.app.BalancepositionApp;

import com.balpos.app.domain.DataPoint;
import com.balpos.app.repository.DataPointRepository;
import com.balpos.app.service.DataPointService;
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
import java.util.List;

import static com.balpos.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DataPointResource REST controller.
 *
 * @see DataPointResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = BalancepositionApp.class)
public class DataPointResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORDER = 1;
    private static final Integer UPDATED_ORDER = 2;

    @Autowired
    private DataPointRepository dataPointRepository;

    @Autowired
    private DataPointService dataPointService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDataPointMockMvc;

    private DataPoint dataPoint;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DataPointResource dataPointResource = new DataPointResource(dataPointService);
        this.restDataPointMockMvc = MockMvcBuilders.standaloneSetup(dataPointResource)
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
    public static DataPoint createEntity(EntityManager em) {
        DataPoint dataPoint = new DataPoint()
            .name(DEFAULT_NAME)
            .order(DEFAULT_ORDER);
        return dataPoint;
    }

    @Before
    public void initTest() {
        dataPoint = createEntity(em);
    }

    @Test
    @Transactional
    public void createDataPoint() throws Exception {
        int databaseSizeBeforeCreate = dataPointRepository.findAll().size();

        // Create the DataPoint
        restDataPointMockMvc.perform(post("/api/data-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataPoint)))
            .andExpect(status().isCreated());

        // Validate the DataPoint in the database
        List<DataPoint> dataPointList = dataPointRepository.findAll();
        assertThat(dataPointList).hasSize(databaseSizeBeforeCreate + 1);
        DataPoint testDataPoint = dataPointList.get(dataPointList.size() - 1);
        assertThat(testDataPoint.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDataPoint.getOrder()).isEqualTo(DEFAULT_ORDER);
    }

    @Test
    @Transactional
    public void createDataPointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = dataPointRepository.findAll().size();

        // Create the DataPoint with an existing ID
        dataPoint.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDataPointMockMvc.perform(post("/api/data-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataPoint)))
            .andExpect(status().isBadRequest());

        // Validate the DataPoint in the database
        List<DataPoint> dataPointList = dataPointRepository.findAll();
        assertThat(dataPointList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDataPoints() throws Exception {
        // Initialize the database
        dataPointRepository.saveAndFlush(dataPoint);

        // Get all the dataPointList
        restDataPointMockMvc.perform(get("/api/data-points?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(dataPoint.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].order").value(hasItem(DEFAULT_ORDER)));
    }

    @Test
    @Transactional
    public void getDataPoint() throws Exception {
        // Initialize the database
        dataPointRepository.saveAndFlush(dataPoint);

        // Get the dataPoint
        restDataPointMockMvc.perform(get("/api/data-points/{id}", dataPoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(dataPoint.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.order").value(DEFAULT_ORDER));
    }

    @Test
    @Transactional
    public void getNonExistingDataPoint() throws Exception {
        // Get the dataPoint
        restDataPointMockMvc.perform(get("/api/data-points/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDataPoint() throws Exception {
        // Initialize the database
        dataPointService.save(dataPoint);

        int databaseSizeBeforeUpdate = dataPointRepository.findAll().size();

        // Update the dataPoint
        DataPoint updatedDataPoint = dataPointRepository.findOne(dataPoint.getId());
        // Disconnect from session so that the updates on updatedDataPoint are not directly saved in db
        em.detach(updatedDataPoint);
        updatedDataPoint
            .name(UPDATED_NAME)
            .order(UPDATED_ORDER);

        restDataPointMockMvc.perform(put("/api/data-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDataPoint)))
            .andExpect(status().isOk());

        // Validate the DataPoint in the database
        List<DataPoint> dataPointList = dataPointRepository.findAll();
        assertThat(dataPointList).hasSize(databaseSizeBeforeUpdate);
        DataPoint testDataPoint = dataPointList.get(dataPointList.size() - 1);
        assertThat(testDataPoint.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDataPoint.getOrder()).isEqualTo(UPDATED_ORDER);
    }

    @Test
    @Transactional
    public void updateNonExistingDataPoint() throws Exception {
        int databaseSizeBeforeUpdate = dataPointRepository.findAll().size();

        // Create the DataPoint

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDataPointMockMvc.perform(put("/api/data-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(dataPoint)))
            .andExpect(status().isCreated());

        // Validate the DataPoint in the database
        List<DataPoint> dataPointList = dataPointRepository.findAll();
        assertThat(dataPointList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDataPoint() throws Exception {
        // Initialize the database
        dataPointService.save(dataPoint);

        int databaseSizeBeforeDelete = dataPointRepository.findAll().size();

        // Get the dataPoint
        restDataPointMockMvc.perform(delete("/api/data-points/{id}", dataPoint.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DataPoint> dataPointList = dataPointRepository.findAll();
        assertThat(dataPointList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DataPoint.class);
        DataPoint dataPoint1 = new DataPoint();
        dataPoint1.setId(1L);
        DataPoint dataPoint2 = new DataPoint();
        dataPoint2.setId(dataPoint1.getId());
        assertThat(dataPoint1).isEqualTo(dataPoint2);
        dataPoint2.setId(2L);
        assertThat(dataPoint1).isNotEqualTo(dataPoint2);
        dataPoint1.setId(null);
        assertThat(dataPoint1).isNotEqualTo(dataPoint2);
    }
}
